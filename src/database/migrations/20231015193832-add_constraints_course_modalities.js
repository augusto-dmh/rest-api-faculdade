/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface) {
    await queryInterface.addConstraint("course_modalities", {
      type: "foreign key",
      fields: ["course_id"],
      references: {
        table: "courses",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    await queryInterface.addConstraint("course_modalities", {
      type: "foreign key",
      fields: ["modality_id"],
      references: {
        table: "modalities",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    await queryInterface.addConstraint("course_modalities", {
      type: "primary key",
      fields: ["course_id", "modality_id"],
    });
  },

  async down(queryInterface) {
    await queryInterface.removeConstraint(
      "course_modalities",
      "course_modalities_course_id_courses_fk",
    );

    await queryInterface.removeConstraint(
      "course_modalities",
      "course_modalities_modality_id_modalities_fk",
    );

    await queryInterface.removeConstraint("course_modalities", "PRIMARY");
  },
};
