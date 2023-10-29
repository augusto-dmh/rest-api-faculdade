import { DateTime } from "luxon";
import CPF from "cpf";
import queryString from "query-string";
import Student from "../models/Student";
import Course from "../models/Course";

const store = async (req, res) => {
  const errors = [];
  const {
    ra = "",
    name = "",
    lastName = "",
    courseId = "",
    birthDate = "",
    semester = "",
    cpf = "",
  } = req.body;
  const requestedKeys = { ra, name, lastName, courseId, birthDate, semester, cpf };

  validateRequestedKeys(requestedKeys, errors);
  await validateRa(ra, errors);
  validateName(lastName, errors);
  validateLastName(lastName, errors);
  await validateRowExistence(courseId, "id", Course, errors);
  validateBirthDate(birthDate, errors);
  await validateCpf(cpf, errors);
  validateSemester(semester, errors);
  res.json({ errors });
};

const index = async (req, res) => {
  const errors = [];

  req.query = queryString.parse(req.originalUrl.split("?")[1], {
    arrayFormat: "comma",
  });

  let { courseId, semester } = req.query;

  courseId = ensureArray(courseId);
  semester = ensureArray(semester);

  if (courseId) {
    for (const cId of courseId) {
      await validateRowExistence(cId, "id", Course, errors);
    }
  }

  if (semester) {
    for (const s of semester) {
      validateSemester(s, errors);
    }
  }

  if (errors.length > 0) return res.status(400).json({ errors });

  try {
    let students = [];

    if (!courseId && !semester) {
      students = await Student.findAll();
      return res.json(students);
    }

    if (courseId && !semester) {
      students = await Student.findAll({ where: { courseId } });
      return res.json(students);
    }

    if (!courseId && semester) {
      students = await Student.findAll({ where: { semester } });
      return res.json(students);
    }

    students = await Student.findAll({ where: { courseId, semester } });
    return res.json(students);
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};

const show = async (req, res) => {};

const update = async (req, res) => {};

const destroy = async (req, res) => {};

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

async function validateRa(ra, errors) {
  if (typeof ra !== "string") {
    return errors.push({
      title: "Invalid Input Data",
      message: `'ra' must be a string`,
    });
  }

  if (Number(ra) && ra.length !== 10) {
    errors.push({
      title: "Invalid Input Data",
      message: `'ra' must contain 10 digits`,
    });
  }

  await validateKeyUniqueness(ra, "ra", Student, errors);
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

  await validateKeyUniqueness(cpf, "cpf", Student, errors);
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

function validateSemester(semester, errors) {
  if (!Number.isInteger(semester)) {
    return errors.push({
      title: "Invalid Input Data",
      message: `'semester' must be an integer`,
    });
  }

  if (semester < 4 || semester > 10) {
    errors.push({
      title: "Invalid Input Data",
      message: `'semester' must be between 4 and 10`,
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
