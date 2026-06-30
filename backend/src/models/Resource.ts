import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Resource extends Model {
  declare id: number;
  declare title: string;
  declare description: string;
  declare category: string;
  declare link: string;
  declare fileUrl: string;
  declare level: string;
  declare published: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Resource.init(
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
    link: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    fileUrl: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    level: {
      type: DataTypes.STRING,
      defaultValue: 'beginner',
    },
    published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'resources',
    indexes: [
      { fields: ['category', 'published'] },
      { fields: ['createdAt'] },
    ],
  }
);

export default Resource;
