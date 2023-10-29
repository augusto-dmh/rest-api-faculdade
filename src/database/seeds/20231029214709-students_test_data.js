/** @type {import('sequelize-cli').Migration} */

const studentsGenerator = require("../../tests/studentsGenerator");

module.exports = {
  async up(queryInterface) {
    const students = studentsGenerator();
    await queryInterface.bulkInsert("students", students, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("students", null, {});
  },
};
