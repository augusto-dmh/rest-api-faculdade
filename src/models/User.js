import { Model, DataTypes } from "sequelize";
import bcrypt from "bcryptjs";

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
        },
        username: {
          type: DataTypes.STRING,
        },
        password: {
          type: DataTypes.STRING,
        },
      },
      { sequelize },
    );

    this.addHook("beforeSave", async (user) => {
      if (!user.password) return;
      user.password = await bcrypt.hash(user.password, 10);
    });

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Permission, { through: models.UserPermission });
  }
}
