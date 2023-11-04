import Permission from "../models/Permission";

const store = async (req, res) => {
  const errors = [];
  const { name, description } = req.body;
  const input = { name, description };

  await validateInput(input, errors);

  if (errors.length > 0) return res.status(400).json({ errors });

  try {
    const permission = await Permission.create({ ...input });

    return res.json(permission);
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};

const index = async (req, res) => {
  try {
    const permissions = await Permission.findAll();

    return res.json(permissions);
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};

const show = async (req, res) => {
  const errors = [];
  const { name } = req.params;

  await validateRowExistence(name, "name", Permission, errors);

  if (errors.length > 0) return res.status(400).json({ errors });

  try {
    const permission = await Permission.findOne({ where: { name } });

    return res.json(permission);
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};

const update = async (req, res) => {
  const errors = [];
  const { name, description } = req.body;
  const input = { name, description };

  if (name) await validateName(name, errors);
  if (description) validateDescription(description, errors);
  await validateRowExistence(req.params.name, "name", Permission, errors);

  if (errors.length > 0) return res.status(400).json({ errors });

  try {
    const permission = await Permission.findOne({ where: { name: req.params.name } });
    await permission.update({ ...input });

    return res.json(permission);
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};

const destroy = async (req, res) => {
  const errors = [];
  const { name } = req.params;

  await validateRowExistence(name, "name", Permission, errors);

  if (errors.length > 0) return res.status(400).json({ errors });

  try {
    const permission = await Permission.findOne({ where: name });
    await permission.destroy();

    return res.json(permission);
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};

export default { store, index, show, update, destroy };

async function validateInput(input, errors) {
  validateUndefinedKeys(input, errors);

  if (errors.length) return;

  const inputKeys = Object.keys(input);

  await Promise.all(
    inputKeys.map(async (key) => {
      if (key === "name") return validateName(input.name, errors);
      if (key === "description") return validateDescription(input.description, errors);
    }),
  );
}

function validateUndefinedKeys(input, errors) {
  const inputKeys = Object.keys(input);

  const undefinedInputKeys = inputKeys.reduce((acc, key) => {
    if (!input[key]) acc.push(key);
    return acc;
  }, []);

  if (!undefinedInputKeys.length) return;

  undefinedInputKeys.forEach((undefinedInputKey) => {
    errors.push({
      title: "Missing Data",
      message: `'${undefinedInputKey}' was not informed.`,
    });
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

async function validateRowExistence(uniqueKey, uniqueKeyName, Model, errors) {
  const row = await Model.findOne({ where: { [uniqueKeyName]: uniqueKey } });

  if (row) return;

  errors.push({
    title: "Data Not Found",
    message: `A ${Model.name} which ${uniqueKeyName} is '${uniqueKey}' was not found.`,
  });
}

async function validateName(name, errors) {
  if (typeof name !== "string") {
    errors.push({
      title: "Invalid Input Data",
      message: "'name' must be a string.",
    });
  }

  if (name.length > 255) {
    errors.push({
      title: "Invalid Input Data",
      message: "'name' must contain less than 255 characters.",
    });
  }

  await validateKeyUniqueness(name, "name", Permission, errors);
}

function validateDescription(description, errors) {
  if (typeof description !== "string") {
    errors.push({
      title: "Invalid Input Data",
      message: "'description' must be a string.",
    });
  }
}
