import { Model, DataTypes } from "sequelize";

export default class Course extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
        },
        category: {
          type: DataTypes.STRING,
        },
        duration_sem: {
          type: DataTypes.INTEGER,
        },
      },
      { sequelize },
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Student, { foreignKey: "course_id" });
    this.hasMany(models.Professor, { foreignKey: "course_id" });
  }
}
