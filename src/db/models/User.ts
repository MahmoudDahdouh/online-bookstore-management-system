import { DataTypes, Model } from 'sequelize'
import database from '../config/connect'

export class User extends Model {
  declare id: number
  declare username: string
  declare user_role: 'user' | 'admin'
  declare email: string
  declare password_hash: string
}

User.init(
  {
    username: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true,
    },
    user_role: {
      type: DataTypes.ENUM,
      values: ['user', 'admin'],
      defaultValue: 'user',
    },
    email: {
      type: DataTypes.STRING(128),
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    sequelize: database,
    modelName: 'user',
  }
)

export default User
