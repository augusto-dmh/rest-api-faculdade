import queryString from "query-string";
import User from "../models/User";
import Permission from "../models/Permission";
import UserPermission from "../models/UserPermission";

const store = async (req, res) => {
  const errors = [];

  const { username, password } = req.body;
  req.query = queryString.parse(req.originalUrl.split("?")[1], { arrayFormat: "comma" });
  let { permission } = req.query;
  permission = ensureArray(permission);

  const input = { username, password, permission };

  await validateInput(input, errors);

  if (errors.length) return res.status(400).json({ errors });

  try {
    const user = await User.create(req.body);

    await Promise.all(
      permission.map(async (p) => {
        const userId = user.id;
        const permissionId = (await Permission.findOne({ where: { name: p } })).id;

        await UserPermission.create({
          userId,
          permissionId,
        });
      }),
    );

    return res.json(user);
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};

const index = async (req, res) => {};

const show = async (req, res) => {};

const update = async (req, res) => {};

const destroy = async (req, res) => {};

export default { store, index, show, update, destroy };

async function validateInput(input, errors) {
  const inputKeys = Object.keys(input);
  const inputValues = Object.values(input);

  inputValues.forEach((value, i) => {
    if (!value)
      errors.push({
        title: "Missing Data",
        message: `'${inputKeys[i]}' was not informed.`,
      });
  });

  if (errors.length) return;

  await Promise.all(
    inputKeys.map(async (key, i) => {
      if (key === "username") validateUsername(inputValues[i], errors);
      if (key === "password") validatePassword(inputValues[i], errors);
      if (key === "permission") await validatePermission(inputValues[i], errors);
    }),
  );
}

function validateUsername(username, errors) {
  if (typeof username !== "string") {
    errors.push({
      title: "Invalid Input Data",
      message: `'username' must be a string.`,
    });
  }

  if (!(username.length <= 255)) {
    errors.push({
      title: "Invalid input Data",
      message: "'username' must contain less than 255 characters.",
    });
  }
}

function validatePassword(password, errors) {
  const checkers = {
    uppercaseLetters: {
      regEx: /[A-Z]/,
      error: {
        title: "Invalid input Data",
        message: "'password' must contain at least one uppercase character.",
      },
    },
    specialChars: {
      regEx: /[^\w\s]|_/,
      error: {
        title: "Invalid input Data",
        message: "'password' must contain at least one special character.",
      },
    },
    atLeast8Chars: {
      regEx: /^.{8,}$/,
      error: {
        title: "Invalid input Data",
        message: "'password' must contain at least 8 characters.",
      },
    },
  };

  Object.values(checkers).forEach((checker) => {
    if (!checker.regEx.test(password)) errors.push(checker.error);
  });
}

async function validatePermission(permission, errors) {
  await Promise.all(
    permission.map(async (pName) => {
      await validateRowExistence(pName, "name", Permission, errors);
    }),
  );
}

async function validateRowExistence(uniqueKey, uniqueKeyName, Model, errors) {
  const row = await Model.findOne({ where: { [uniqueKeyName]: uniqueKey } });

  if (row) return;

  const modelName = Model.name;

  errors.push({
    title: "Data Not Found",
    message: `A ${modelName} which ${uniqueKeyName} is '${uniqueKey}' was not found.`,
  });
}

function ensureArray(queryParam) {
  return queryParam && !Array.isArray(queryParam) ? [queryParam] : queryParam;
}
