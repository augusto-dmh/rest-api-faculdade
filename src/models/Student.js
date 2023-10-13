import { Model, DataTypes } from "sequelize";

export default class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
        },
        ra: {
          type: DataTypes.INTEGER,
        },
        name: {
          type: DataTypes.STRING,
        },
        last_name: {
          type: DataTypes.STRING,
        },
        course_id: {
          type: DataTypes.INTEGER,
        },
        birth_date: {
          type: DataTypes.DATE,
        },
        semester: {
          type: DataTypes.INTEGER,
        },
        cpf: {
          type: DataTypes.STRING,
        },
      },
      { sequelize },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Course, { foreignKey: "course_id" });
  }
}
