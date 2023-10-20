import Modality from "../models/Modality";

const store = async (req, res) => {
  const errors = [];
  const { name = "" } = req.body;

  validateReqDataExistence(errors, name);
  if (errors.length > 0) return res.status(400).json({ errors });

  validateName(name, errors);
  await validateUniqueness(name, errors);

  if (errors.length > 0) return res.status(400).json({ errors });

  try {
    const modality = await Modality.create(req.body);

    return res.status(200).json(modality);
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};

const index = async (req, res) => {
  try {
    const modalities = await Modality.findAll();

    return res.status(200).json(modalities);
  } catch (e) {
    return res.status(400).json({ errors: e.errors.map((err) => err.message) });
  }
};

const show = async (req, res) => {
  const errors = [];
  const { id } = req.params;

  await validateRowExistenceById(id, errors);
  if (errors.length > 0) return res.status(400).json(errors);

  try {
    const modality = await Modality.findByPk(id);

    return res.status(200).json(modality);
  } catch (e) {
    return res.status(400).json({ errors: e.errors.map((err) => err.message) });
  }
};

const update = async (req, res) => {
  const errors = [];
  const { id = "" } = req.params;
  const { name = "" } = req.body;

  validateReqDataExistence(errors, id);
  if (errors.length > 0) return res.status(400).json({ errors });

  await validateRowExistenceById(id, errors);
  if (errors.length > 0) return res.status(400).json({ errors });

  validateName(name, errors);
  if (errors.length > 0) return res.status(400).json({ errors });

  try {
    let modality = await Modality.findByPk(id);
    modality = await modality.update({ name });

    return res.status(200).json(modality);
  } catch (e) {
    return res.status(400).json({ errors: e.errors.map((err) => err.message) });
  }
};

const destroy = async (req, res) => {
  const errors = [];
  const { id = "" } = req.params;

  await validateRowExistenceById(id, errors);
  if (errors.length > 0) return res.status(400).json({ errors });

  try {
    const modality = await Modality.findByPk(id);
    await modality.destroy();

    return res.status(200).json(modality);
  } catch (e) {
    return res.status(400).json({ errors: e.errors.map((err) => err.message) });
  }
};

export default { store, index, show, update, destroy };

// Validation

function validateName(name, errors) {
  if (typeof name !== "string") {
    errors.push({
      title: "Invalid Input Data",
      message: "'name' must be a string.",
    });
  }

  if (name.length < 5 || name.length > 255) {
    errors.push({
      title: "Invalid Input Data",
      message: "'name' must contain between 5 and 255 characters.",
    });
  }
}

async function validateRowExistenceById(id, errors) {
  const modality = await Modality.findByPk(id);

  if (!modality) {
    errors.push({
      title: "Data Not Found",
      message: `No modality has been found`,
    });
  }
}

function validateReqDataExistence(errors, ...reqData) {
  reqData.forEach((data) => {
    if (!data) {
      errors.push({
        title: "Missing Input Data",
        message: `'${data}' was not informed.`,
      });
    }
  });
}

async function validateUniqueness(name, errors) {
  const modality = await Modality.findOne({ where: { name } });

  if (modality) {
    errors.push({
      title: "Duplicate Entry",
      message: `A modality which name is '${name}' has already been registered.`,
    });
  }
}
