import { Model, DataTypes } from "sequelize";

export default class Professor extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        rd: {
          type: DataTypes.STRING,
        },
        name: {
          type: DataTypes.STRING,
        },
        lastName: {
          type: DataTypes.STRING,
        },
        courseId: {
          type: DataTypes.INTEGER,
        },
        birthDate: {
          type: DataTypes.STRING,
        },
        cpf: {
          type: DataTypes.STRING,
        },
      },
      { sequelize, modelName: "professor" },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.course, { foreignKey: "course_id" });
  }
}
