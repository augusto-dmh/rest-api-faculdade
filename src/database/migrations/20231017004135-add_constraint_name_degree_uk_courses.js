/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface) {
    await queryInterface.addConstraint("courses", {
      type: "unique",
      fields: ["name", "degree"],
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint("courses", "courses_name_degree_uk");
  },
};
