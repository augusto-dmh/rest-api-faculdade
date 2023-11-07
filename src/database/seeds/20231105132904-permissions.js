/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "permissions",
      [
        {
          name: "Read",
          description: "Can read any data from the application.",
        },
        {
          name: "Admin",
          description: "Can create, read, update or delete any data from the application.",
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("permissions", null, {});
  },
};
