import { DataTypes, Model } from 'sequelize'
import database from '../config/connect'
import Book from './Book'
import Order from './Order'

export class OrderItem extends Model {
  declare id: number
  declare order_id: number
  declare user_id: number
  declare book_id: number
  declare quantity: number
  declare price: number
}

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
OrderItem.belongsTo(Book, { foreignKey: 'book_id' })

export default OrderItem
