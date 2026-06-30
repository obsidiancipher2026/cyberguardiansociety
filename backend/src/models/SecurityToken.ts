import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { ISecurityTokenAttributes, ISecurityTokenCreationAttributes } from '../types';

class SecurityToken extends Model<ISecurityTokenAttributes, ISecurityTokenCreationAttributes> implements ISecurityTokenAttributes {
  declare id: number;
  declare adminId: number;
  declare sessionId: string;
  declare otp: string;
  declare otpExpiresAt: Date;
  declare ipAddress: string;
  declare userAgent: string;
  declare verified: boolean;
  declare verifiedAt: Date | null;
  declare expiresAt: Date;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

SecurityToken.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    adminId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sessionId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otpExpiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    ipAddress: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    userAgent: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    verifiedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'security_tokens',
    indexes: [
      { fields: ['adminId'] },
      { fields: ['sessionId'] },
      { fields: ['expiresAt'] },
    ],
  }
);

export default SecurityToken;
