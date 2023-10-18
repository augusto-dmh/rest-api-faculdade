/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "modalities",
      [
        {
          name: "On-campus",
        },
        {
          name: "Remote",
        },
        {
          name: "Hybrid",
        },
        {
          name: "Online",
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("modalities", null, {});
  },
};
