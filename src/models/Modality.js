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
      { sequelize },
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Course, { through: models.CourseModality });
  }
}
