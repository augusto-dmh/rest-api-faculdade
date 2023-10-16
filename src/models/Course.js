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
        durationSem: {
          type: DataTypes.INTEGER,
        },
        degree: {
          type: DataTypes.STRING,
        },
      },
      { sequelize },
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Student, { foreignKey: "course_id" });
    this.hasMany(models.Professor, { foreignKey: "course_id" });
    this.belongsToMany(models.Modality, { through: models.CourseModality });
  }
}
