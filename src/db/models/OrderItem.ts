import { DataTypes, Model } from 'sequelize'
import database from '../config/connect'

export class OrderItem extends Model {}

OrderItem.init(
  {
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize: database,
    modelName: 'order_item',
  }
)

export default OrderItem
