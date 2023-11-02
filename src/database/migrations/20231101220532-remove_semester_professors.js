/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query("ALTER TABLE `professors` DROP COLUMN `semester`;");
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query("ALTER TABLE `professors` ADD `semester` INT;");
  },
};
