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

  await validateInput(input, true, errors);

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

const index = async (req, res) => {
  const errors = [];

  req.query = queryString.parse(req.originalUrl.split("?")[1], { arrayFormat: "comma" });
  let { permission } = req.query;
  permission = ensureArray(permission);

  validatePermission(permission, errors);

  if (errors.length) return res.status(400).json({ errors });

  try {
    const users = [];

    for (const p of permission) {
      const permissionId = (await Permission.findOne({ where: { name: p } })).id;
      const usersPermissions = await UserPermission.findAll({ where: { permissionId } });
      const usersIds = usersPermissions.map((uP) => uP.userId);
      users.push(...(await Promise.all(usersIds.map(async (uI) => User.findByPk(uI)))));
    }

    return res.json(users);
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};

const show = async (req, res) => {
  const errors = [];

  const { username } = req.params;

  await validateRowExistence(username, "username", User, errors);

  if (errors.length) return res.status(400).json({ errors });

  try {
    const user = await User.findOne({ where: { username } });

    return res.json(user);
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};

const update = async (req, res) => {
  const errors = [];

  const { username, password } = req.body;
  const input = { username, password };

  await validateInput(input, false, errors);

  if (errors.length) return res.status(400).json({ errors });

  try {
    const user = await User.findOne({ where: { username: req.params.username } });
    await user.update({ ...input });

    return res.json(user);
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};

const destroy = async (req, res) => {};

export default { store, index, show, update, destroy };

/* isRequired = the input is required (has only required data -> store)
or optional (has only optional data -> update) */
async function validateInput(input, isRequired, errors) {
  const inputKeys = Object.keys(input);
  const inputValues = Object.values(input);

  if (isRequired) {
    inputValues.forEach((value, i) => {
      if (!value)
        errors.push({
          title: "Missing Data",
          message: `'${inputKeys[i]}' was not informed.`,
        });
    });

    await Promise.all(
      inputKeys.map(async (key, i) => {
        if (key === "username") await validateUsername(inputValues[i], errors);
        if (key === "password") validatePassword(inputValues[i], errors);
        if (key === "permission") {
          await validatePermission(inputValues[i], errors);
        }
      }),
    );

    if (errors.length) return;
  }

  await Promise.all(
    inputKeys.map(async (key, i) => {
      if (key === "username" && inputValues[i]) await validateUsername(inputValues[i], errors);
      if (key === "password" && inputValues[i]) validatePassword(inputValues[i], errors);
      if (key === "permission" && inputValues[i]) await validatePermission(inputValues[i], errors);
    }),
  );
}

async function validateUsername(username, errors) {
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

  await validateKeyUniqueness(username, "username", User, errors);
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

async function validateKeyUniqueness(key, keyName, Model, errors) {
  const row = await Model.findOne({ where: { [keyName]: key } });

  if (!row) return;

  const modelName = Model.name;

  errors.push({
    title: "Duplicate Entry",
    message: `A ${modelName} which ${keyName} is '${key}' has already been registered.`,
  });

  errors.push();
}

function ensureArray(queryParam) {
  return queryParam && !Array.isArray(queryParam) ? [queryParam] : queryParam;
}
