import { DataTypes, Model } from 'sequelize'
import database from '../config/connect'

export class Book extends Model {
  declare id: number
  declare title: string
  declare description: string
  declare author: string
  declare genre: string
  declare language: string
  declare isbn: number
  declare price: number
  declare page_count: number
  declare quantity: number
  declare published_date: number
  declare is_deleted: boolean
}

Book.init(
  {
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    language: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    isbn: {
      type: DataTypes.STRING(13),
      allowNull: false,
      unique: true,
    },
    price: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    page_count: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 1,
    },
    published_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: database,
    modelName: 'book',
  }
)

export default Book
