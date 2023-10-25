import { Model, DataTypes } from "sequelize";

export default class CourseModality extends Model {
  static init(sequelize) {
    super.init(
      {
        courseId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        modalityId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      { sequelize, modelName: "courseModality", timestamps: false },
    );

    return this;
  }
}
