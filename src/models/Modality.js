import { Model, DataTypes } from "sequelize";

export default class Modality extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      { sequelize, modelName: "modality" },
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.course, {
      as: "courses",
      through: models.courseModality,
    });
  }
}
