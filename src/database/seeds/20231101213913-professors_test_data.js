/** @type {import('sequelize-cli').Migration} */

const professorsGenerator = require("../../tests/professorsGenerator");

module.exports = {
  async up(queryInterface) {
    const professors = professorsGenerator();
    await queryInterface.bulkInsert("professors", professors, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("professors", null, {});
  },
};
