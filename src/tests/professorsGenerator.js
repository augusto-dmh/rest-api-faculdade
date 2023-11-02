const { faker } = require("@faker-js/faker");
const { DateTime } = require("luxon");
const CPF = require("cpf");

function professorsGenerator() {
  const professorsData = [];

  for (let i = 0; i < 1000; i++) {
    const id = faker.string.uuid();
    const rd = faker.string.numeric(10);
    const name = faker.person.firstName();
    const last_name = faker.person.lastName();
    const course_id = faker.number.int({ min: 1, max: 94 });
    const birth_date = DateTime.fromJSDate(
      faker.date.birthdate({ min: 14, max: 30, mode: "age" }),
    ).toFormat("yyyy-MM-dd");
    const cpf = CPF.generate(false);
    const created_at = new Date();
    const updated_at = new Date();

    const studentData = {
      id,
      rd,
      name,
      last_name,
      course_id,
      birth_date,
      cpf,
      created_at,
      updated_at,
    };

    professorsData.push(studentData);
  }

  return professorsData;
}

module.exports = professorsGenerator;
