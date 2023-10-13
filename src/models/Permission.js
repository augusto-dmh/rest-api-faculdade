import { Model, DataTypes } from "sequelize";

export default class Permission extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING,
        },
        description: {
          type: DataTypes.TEXT,
        },
      },
      { sequelize },
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.User, { through: models.UserPermission });
  }
}