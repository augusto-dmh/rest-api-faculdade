/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query("ALTER TABLE user_permissions DROP COLUMN created_at;");
    await queryInterface.sequelize.query("ALTER TABLE user_permissions DROP COLUMN updated_at;");

    await queryInterface.sequelize.query("ALTER TABLE course_modalities DROP COLUMN created_at;");
    await queryInterface.sequelize.query("ALTER TABLE course_modalities DROP COLUMN updated_at;");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn("user_permissions", "created_at", { type: Sequelize.DATE });
    await queryInterface.addColumn("user_permissions", "updated_at", { type: Sequelize.DATE });

    await queryInterface.addColumn("course_modalities", "created_at", { type: Sequelize.DATE });
    await queryInterface.addColumn("course_modalities", "updated_at", { type: Sequelize.DATE });
  },
};
