import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class AppLog extends Model {
  declare id: number;
  declare level: string;
  declare message: string;
  declare source: string;
  declare details: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

AppLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    level: {
      type: DataTypes.STRING,
      defaultValue: 'info',
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    source: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    details: {
      type: DataTypes.TEXT,
      defaultValue: '{}',
    },
  },
  {
    sequelize,
    tableName: 'app_logs',
    indexes: [
      { fields: ['level', 'source'] },
      { fields: ['createdAt'] },
    ],
  }
);

export default AppLog;
