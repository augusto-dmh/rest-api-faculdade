import { Model, DataTypes } from "sequelize";

export default class UserPermission extends Model {
  static init(sequelize) {
    super.init(
      {
        user_id: {
          type: DataTypes.UUID,
          allowNull: false,
        },
        permission_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      { sequelize, timestamps: false },
    );
  }
}
