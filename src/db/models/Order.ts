import { DataTypes, Model } from 'sequelize'
import database from '../config/connect'

export class Order extends Model {}

Order.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize: database,
    modelName: 'order',
  }
)

export default Order
