import queryString from "query-string";
import Course from "../models/Course";
import Modality from "../models/Modality";
import CourseModality from "../models/CourseModality";

const store = async (req, res) => {
  const keysExpected = ["name", "category", "durationSem", "degree"];
  req.query = queryString.parse(req.originalUrl.split("?")[1], { arrayFormat: "comma" });
  const errors = [];

  validateReqBody(req.body, keysExpected, errors);
  validateReqQuery(req.query, errors, "modality");

  if (errors.length > 0) return res.status(400).json({ errors });

  const { name, category, durationSem, degree } = req.body;
  let { modality = "" } = req.query;

  if (!Array.isArray(modality)) modality = [modality]; // to guarantee that even if just one modality is sent on query params, it'll be treated as an array

  validateName(name, errors);
  validateCategory(category, errors);
  validateDurationSem(durationSem, errors);
  validateDegree(degree, errors);
  modality.forEach(async (m) => validateRowExistenceByName(Modality, m, errors));
  await alreadyExists(name, degree, errors);

  if (errors.length > 0) return res.status(400).json({ errors });

  try {
    const course = await Course.create(req.body); // review here adsasdasasddadsa
    modality.forEach(async (m) => {
      const modalityC = Modality.findOne({ where: { name: m } });
      await CourseModality.create({ course_id: course.id, modality_id: modalityC.id });
    });

    return res.status(200).json(course);
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};

const index = async (req, res) => {
  try {
    const { name = "", category = "", durationSem = "", degree = "" } = req.query;
    const userFilters = { name, category, durationSem, degree };

    Object.keys(userFilters).forEach((filter) => {
      if (!userFilters[filter]) delete userFilters[filter];
    });

    let courses = await Course.findAll({
      include: { model: Modality, attributes: ["name"], through: { attributes: [] } },
    });

    if (userFilters) {
      courses = await Course.findAll({
        where: { ...userFilters },
        include: { model: Modality, attributes: ["name"], through: { attributes: [] } },
      });
    }

    return res.status(200).json(courses);
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};

const show = async (req, res) => {
  const { id } = req.body;

  try {
    const course = await Course.findByPk(id);

    return res.status(200).json(course);
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};

const update = async (req, res) => {
  const errors = [];

  const { name = "", category = "", durationSem = "", degree = "" } = req.body;

  if (name) validateName(name, errors);
  if (category) validateCategory(category, errors);
  if (durationSem) validateDurationSem(durationSem, errors);
  if (degree) validateDegree(degree, errors);

  if (errors.length > 0) return res.status(400).json({ errors });

  const { id } = req.params;
  const course = await Course.findByPk(id);

  if (!course) {
    errors.push({
      title: "Course not found",
      message: `The course '${req.body.name}' was not found.`,
    });
  }

  if (errors.length > 0) return res.status(400).json({ errors });
  try {
    const updatedCourse = await course.update(req.body);

    return res.status(200).json(updatedCourse);
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};

const destroy = async (req, res) => {
  const errors = [];

  const { id } = req.params;
  const course = await Course.findByPk(id);

  if (!course) {
    errors.push({
      title: "Course not found",
      message: `No course which id is '${id}' was found.`,
    });
  }

  if (errors.length > 0) return res.status(400).json({ errors });

  try {
    await course.destroy();

    return res.status(200).json(course);
  } catch (e) {
    return res.status(400).json({
      errors: e.errors.map((err) => err.message),
    });
  }
};

export default { store, index, show, update, destroy };

// Validation
function validateReqBody(reqBody, keysExpected, errors) {
  const missingKeys = keysExpected.filter((key) => !Object.keys(reqBody).includes(key));

  if (!missingKeys) return;

  missingKeys.forEach((key) => {
    errors.push({
      title: "Missing data",
      message: `'${key}' was not informed.`,
    });
  });
}

function validateReqQuery(reqQuery, errors, ...keysExpected) {
  const reqQueryKeys = Object.keys(reqQuery);
  const reqQueryValues = Object.values(reqQuery);
  const missingKeys = keysExpected.filter((key) => !reqQueryKeys.includes(key));

  if (reqQueryValues.includes(null)) {
    errors.push({
      title: "Invalid Input Data",
      message: "Null values are not allowed.",
    });
  }

  if (!missingKeys) return;

  missingKeys.forEach((key) => {
    errors.push({
      title: "Missing data",
      message: `'${key}' was not informed.`,
    });
  });
}

function validateName(name, errors) {
  if (typeof name !== "string") {
    errors.push({
      title: "Invalid input data",
      message: "'name' must be a string.",
    });
  }

  if (!(name.length >= 5 && name.length <= 255)) {
    errors.push({
      title: "Invalid input data",
      message: "'name' must contain between 5 and 255 characters.",
    });
  }
}

function validateCategory(category, errors) {
  if (typeof category !== "string") {
    errors.push({
      title: "Invalid input data",
      message: "'category' must be a string.",
    });
  }

  if (!(category.length >= 5 && category.length <= 255)) {
    errors.push({
      title: "Invalid input data",
      message: "'category' must contain between 5 and 255 characters.",
    });
  }
}

function validateDurationSem(durationSem, errors) {
  if (!Number.isInteger(durationSem)) {
    errors.push({
      title: "Invalid input data",
      message: "'durationSem' must be an integer.",
    });
  }
}

function validateDegree(degree, errors) {
  const availableDegrees = ["Bachelor", "Associate", "Teaching"];

  if (!availableDegrees.includes(degree)) {
    errors.push({
      title: "Invalid Degree",
      message: `The degree '${degree}' is invalid.`,
    });
  }
}

async function validateRowExistenceByName(Model, name, errors) {
  const row = await Model.findOne({ where: { name } });
  const modelName = Model.toString()
    .toLowerCase()
    .match(/class (\w+)/)[1];

  if (!row) {
    errors.push({
      title: "Data Not Found",
      message: `No ${modelName} which name is '${name}' was found.`,
    });
  }
}

async function alreadyExists(name, degree, errors) {
  const course = await Course.findOne({ where: { name, degree } });

  if (course) {
    errors.push({
      title: "Course already exists",
      message: `'${course.name}' has already been registered.`,
    });
  }
}
