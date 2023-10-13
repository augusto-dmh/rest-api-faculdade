/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("students", "course_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      before: "created_at",
    });
    await queryInterface.addColumn("professors", "course_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      before: "created_at",
    });

    await queryInterface.addConstraint("students", {
      type: "foreign key",
      references: {
        table: "courses",
        field: "id",
      },
      fields: ["course_id"],
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
    await queryInterface.addConstraint("professors", {
      type: "foreign key",
      references: {
        table: "courses",
        field: "id",
      },
      fields: ["course_id"],
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint("students", "students_course_id_courses_fk");
    await queryInterface.removeConstraint("professors", "professors_course_id_courses_fk");

    await queryInterface.sequelize.query("ALTER TABLE `students` DROP COLUMN `course_id`");
    await queryInterface.sequelize.query("ALTER TABLE `professors` DROP COLUMN `course_id`");
  },
};
