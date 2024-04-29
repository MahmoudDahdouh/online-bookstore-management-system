import { DataTypes } from 'sequelize'
import database from '../config/connect'

const User = database.define('user', {
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
})

export default User
