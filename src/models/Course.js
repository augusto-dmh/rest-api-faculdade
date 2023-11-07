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
      { sequelize, modelName: "course" },
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.student, { foreignKey: "courseId" });
    this.hasMany(models.professor, { foreignKey: "courseId" });
    this.belongsToMany(models.modality, {
      as: "modalities",
      through: models.courseModality,
    });
  }
}
