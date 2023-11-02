import { DateTime } from "luxon";
import CPF from "cpf";
import queryString from "query-string";
import { Op } from "sequelize";
import Professor from "../models/Professor";
import Course from "../models/Course";

const store = async (req, res) => {
  const errors = [];
  const { rd, name, lastName, courseId, birthDate, cpf } = req.body;
  const requestedKeys = { rd, name, lastName, courseId, birthDate, cpf };

  validateRequestedKeys(requestedKeys, errors);

  if (errors.length > 0) return res.status(400).json({ errors });

  await validateRd(rd, errors);
  validateName(name, errors);
  validateLastName(lastName, errors);
  await validateRowExistence(courseId, "id", Course, errors);
  validateBirthDate(birthDate, errors);
  await validateCpf(cpf, errors);

  if (errors.length > 0) return res.status(400).json({ errors });

  req.body.birthDate = DateTime.fromFormat(birthDate, "dd-MM-yyyy").toFormat("yyyy-MM-dd");

  try {
    const professor = await Professor.create(req.body);

    return res.json(professor);
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};

const index = async (req, res) => {
  const errors = [];

  req.query = queryString.parse(req.originalUrl.split("?")[1], {
    arrayFormat: "comma",
  });

  let { course, category } = req.query;

  if (errors.length > 0) return res.status(400).json({ errors });

  course = ensureArray(course);
  category = ensureArray(category);

  if (errors.length > 0) return res.status(400).json({ errors });

  try {
    const whereFilters = { courseId: { [Op.in]: [] } };
    const includeFilters = [];

    if (course) {
      const coursesIds = [];

      for (const cName of course) {
        const courseByName = await Course.findOne({ where: { name: cName } });

        if (courseByName) coursesIds.push(courseByName.id);
      }

      whereFilters.courseId[Op.in].push(...coursesIds);
      includeFilters.push({ model: Course, attributes: ["name", "category"] });
    }

    if (category) {
      const coursesIds = [];

      for (const c of category) {
        const coursesByCategory = await Course.findAll({ where: { category: c } });

        if (coursesByCategory) {
          coursesByCategory.forEach((courseBC) => coursesIds.push(courseBC.id));
        }

        whereFilters.courseId[Op.in].push(...coursesIds);
        includeFilters.push({ model: Course, attributes: ["name", "category"] });
      }
    }

    const professors = await Professor.findAll({
      where: whereFilters,
      include: includeFilters,
    });
    return res.json(professors);
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};

const show = async (req, res) => {
  const errors = [];
  const { rd } = req.params;

  await validateRowExistence(rd, "rd", Professor, errors);

  if (errors.length > 0) return res.status(400).json({ errors });

  try {
    const professor = await Professor.findOne({ where: { rd } });

    return res.json(professor);
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};

const update = async (req, res) => {
  const errors = [];
  const { rd } = req.params;

  await validateRowExistence(rd, "rd", Professor, errors);

  if (errors.length > 0) return res.status(400).json({ errors });

  if (req.body.rd) await validateRd(req.body.rd, errors);
  if (req.body.name) validateName(req.body.name, errors);
  if (req.body.lastName) validateLastName(req.body.lastName, errors);
  if (req.body.courseId) await validateRowExistence(req.body.courseId, "id", Course, errors);
  if (req.body.birthDate) validateBirthDate(req.body.birthDate, errors);
  if (req.body.cpf) await validateCpf(req.body.cpf, errors);

  if (errors.length > 0) return res.status(400).json({ errors });

  try {
    const professor = await Professor.findOne({ where: { rd } });

    const updatedProfessor = await professor.update(req.body);
    res.json(updatedProfessor);
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};

const destroy = async (req, res) => {
  const errors = [];
  const { rd } = req.params;
  const professor = await Professor.findOne({ where: { rd } });

  await validateRowExistence(rd, "rd", Professor, errors);

  if (errors.length > 0) return res.status(400).json({ errors });

  try {
    await professor.destroy();

    return res.json(professor);
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};

export default { store, index, show, update, destroy };

// Validation

function validateRequestedKeys(requestedKeys, errors) {
  const keys = Object.keys(requestedKeys);
  const keyValues = Object.values(requestedKeys);

  keyValues.forEach((keyValue, i) => {
    if (!keyValue) {
      errors.push({
        title: "Invalid Input Data",
        message: `'${keys[i]}' was not informed`,
      });
    }
  });
}

async function validateRd(rd, errors) {
  if (typeof rd !== "string" || !Number(rd) || rd.length !== 10) {
    return errors.push({
      title: "Invalid Input Data",
      message: `'rd' must be a string containing 10 digits.`,
    });
  }

  await validateKeyUniqueness(rd, "rd", Professor, errors);
}

function validateName(name, errors) {
  if (typeof name !== "string") {
    errors.push({
      title: "Invalid input data",
      message: "'name' must be a string.",
    });
  }

  if (!(name.length <= 255)) {
    errors.push({
      title: "Invalid input data",
      message: "'name' must contain less than 255 characters.",
    });
  }
}

async function validateCpf(cpf, errors) {
  if (typeof cpf !== "string") {
    return errors.push({
      title: "Invalid Input Data",
      message: `'cpf' must be a string`,
    });
  }

  cpf = CPF.format(cpf);

  if (!CPF.isValid(cpf)) {
    errors.push({
      title: "Invalid Input Data",
      message: `'cpf' is invalid`,
    });
  }

  await validateKeyUniqueness(cpf, "cpf", Professor, errors);
}

function validateLastName(lastName, errors) {
  if (typeof lastName !== "string") {
    return errors.push({
      title: "Invalid Input Data",
      message: `'lastName' must be a string`,
    });
  }

  if (lastName > 255) {
    errors.push({
      title: "Invalid input data",
      message: "'lastName' must contain less than 255 characters.",
    });
  }
}

function validateBirthDate(birthDate, errors) {
  const dateFormatExpected = /^\d{2}-\d{2}-\d{4}$/;

  if (typeof birthDate !== "string" || !dateFormatExpected.test(birthDate)) {
    return errors.push({
      title: "Invalid Input Data",
      message: "'birthDate' must be a string in dd-MM-yyyy date format.",
    });
  }

  const parsedBirthDate = DateTime.fromFormat(birthDate, "dd-MM-yyyy");
  const diffFromNow = Math.ceil(parsedBirthDate.diffNow().as("years"));

  if (diffFromNow >= 0) {
    errors.push({
      title: "Invalid Input Data",
      message: "'birthDate' is invalid.",
    });
  }

  // to check other validation issues like invalid months etc.
  if (!parsedBirthDate.isValid) {
    errors.push({
      title: "Invalid Input Data",
      message: parsedBirthDate.invalidExplanation,
    });
  }
}

async function validateKeyUniqueness(key, keyName, Model, errors) {
  const row = await Model.findOne({ where: { [keyName]: key } });

  if (!row) return;

  const modelName = Model.name;

  errors.push({
    title: "Duplicate Entry",
    message: `A ${modelName} which ${keyName} is '${key}' has already been registered.`,
  });
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

function ensureArray(value) {
  return value && !Array.isArray(value) ? [value] : value;
}
