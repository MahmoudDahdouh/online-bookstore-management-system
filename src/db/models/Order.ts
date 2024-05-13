import { DataTypes, Model } from 'sequelize'
import database from '../config/connect'
import OrderItem from './OrderItem'

export class Order extends Model {
  declare id: number
  declare user_id: number
  declare total: number
}

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
Order.hasMany(OrderItem, { foreignKey: 'order_id' })

export default Order
