import { Model, DataTypes } from "sequelize";

export default class CourseModality extends Model {
  static init(sequelize) {
    super.init(
      {
        course_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        modality_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      { sequelize, timestamps: false },
    );

    return this;
  }
}
