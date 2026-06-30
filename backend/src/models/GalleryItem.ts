import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class GalleryItem extends Model {
  declare id: number;
  declare title: string;
  declare description: string;
  declare category: string;
  declare imageUrl: string;
  declare published: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

GalleryItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    imageUrl: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    published: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'gallery_items',
    indexes: [
      { fields: ['category', 'published'] },
      { fields: ['createdAt'] },
    ],
  }
);

export default GalleryItem;
