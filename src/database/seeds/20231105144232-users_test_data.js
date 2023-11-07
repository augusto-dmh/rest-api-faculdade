/** @type {import('sequelize-cli').Migration} */

const { usersGenerator } = require("../../tests/usersGenerator");
const { usersPermissionsGenerator } = require("../../tests/usersGenerator");

module.exports = {
  async up(queryInterface) {
    const users = await usersGenerator();
    const usersPermissions = usersPermissionsGenerator(users);

    await queryInterface.bulkInsert("users", users, {});
    await queryInterface.bulkInsert("user_permissions", usersPermissions, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.bulkDelete("user_permissions", null, {});
  },
};
