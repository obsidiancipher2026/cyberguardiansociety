import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { IActivityLogAttributes, IActivityLogCreationAttributes } from '../types';
import { ACTIVITY_STATUSES } from '../config/constants';

class ActivityLog extends Model<IActivityLogAttributes, IActivityLogCreationAttributes> implements IActivityLogAttributes {
  declare id: number;
  declare adminId: number | null;
  declare action: string;
  declare resourceType: string;
  declare resourceId: string;
  declare changes: string;
  declare ipAddress: string;
  declare userAgent: string;
  declare status: 'success' | 'failed';
  declare errorMessage: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

ActivityLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resourceType: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    resourceId: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    changes: {
      type: DataTypes.TEXT,
      defaultValue: '{}',
      get() {
        const raw = this.getDataValue('changes');
        if (!raw) return '{}';
        try { return JSON.parse(raw as string); } catch { return '{}'; }
      },
      set(value: Record<string, unknown> | string) {
        this.setDataValue('changes', typeof value === 'string' ? value : JSON.stringify(value));
      },
    },
    ipAddress: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    userAgent: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
    status: {
      type: DataTypes.STRING,
      values: [...ACTIVITY_STATUSES],
      defaultValue: 'success',
    },
    errorMessage: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
  },
  {
    sequelize,
    tableName: 'activity_logs',
    indexes: [
      { fields: ['createdAt'] },
      { fields: ['adminId', 'createdAt'] },
      { fields: ['action', 'resourceType'] },
    ],
  }
);

export default ActivityLog;
