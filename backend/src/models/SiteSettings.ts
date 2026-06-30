import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class SiteSettings extends Model {
  declare id: number;
  declare key: string;
  declare value: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

SiteSettings.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    value: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
  },
  {
    sequelize,
    tableName: 'site_settings',
    indexes: [
      { fields: ['key'], unique: true },
    ],
  }
);

export default SiteSettings;
