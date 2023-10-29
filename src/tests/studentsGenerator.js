const { faker } = require("@faker-js/faker");
const { DateTime } = require("luxon");
const CPF = require("cpf");

function studentsGenerator() {
  const studentsData = [];

  for (let i = 0; i < 100; i++) {
    const id = faker.string.uuid();
    const ra = faker.string.numeric(10);
    const name = faker.person.firstName();
    const last_name = faker.person.lastName();
    const course_id = faker.number.int({ min: 1, max: 94 });
    const birth_date = DateTime.fromJSDate(
      faker.date.birthdate({ min: 14, max: 30, mode: "age" }),
    ).toFormat("yyyy-MM-dd");
    const semester = faker.number.int({ min: 4, max: 10 });
    const cpf = CPF.generate(false);
    const created_at = new Date();
    const updated_at = new Date();

    const studentData = {
      id,
      ra,
      name,
      last_name,
      course_id,
      birth_date,
      semester,
      cpf,
      created_at,
      updated_at,
    };

    studentsData.push(studentData);
  }

  return studentsData;
}

module.exports = studentsGenerator;
