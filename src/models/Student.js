import { Model, DataTypes } from "sequelize";

export default class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        ra: {
          type: DataTypes.INTEGER,
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
          type: DataTypes.DATE,
        },
        semester: {
          type: DataTypes.INTEGER,
        },
        cpf: {
          type: DataTypes.STRING,
        },
      },
      { sequelize, modelName: "student" },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.course, { foreignKey: "course_id" });
  }
}
