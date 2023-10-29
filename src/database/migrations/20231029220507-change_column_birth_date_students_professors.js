/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("students", "birth_date", {
      type: Sequelize.DATEONLY,
      allowNull: false,
    });
    await queryInterface.changeColumn("professors", "birth_date", {
      type: Sequelize.DATEONLY,
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("students", "birth_date", {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.changeColumn("professors", "birth_date", {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },
};
