import { Model, DataTypes } from "sequelize";

export default class UserPermission extends Model {
  static init(sequelize) {
    super.init(
      {
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        permissionId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      { sequelize, modelName: "userPermission", timestamps: false },
    );

    return this;
  }
}
