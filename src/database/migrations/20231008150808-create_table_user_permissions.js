/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("user_permissions", {
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      permission_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("user_permissions");
  },
};
