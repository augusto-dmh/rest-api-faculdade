/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.addConstraint("user_permissions", {
      type: "foreign key",
      references: {
        table: "users",
        field: "id",
      },
      fields: ["user_id"],
    });
    await queryInterface.addConstraint("user_permissions", {
      type: "foreign key",
      references: {
        table: "permissions",
        field: "id",
      },
      fields: ["permission_id"],
    });
    await queryInterface.addConstraint("user_permissions", {
      type: "primary key",
      fields: ["user_id", "permission_id"],
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint("user_permissions", "user_permissions_user_id_users_fk");
    await queryInterface.removeConstraint("user_permissions", "user_permissions_permission_id_permissions_fk");
    await queryInterface.removeConstraint("user_permissions", "PRIMARY");
  },
};
