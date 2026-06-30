import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { IAdminAttributes, IAdminCreationAttributes } from '../types';
import { ROLES, ROLE_PERMISSIONS } from '../config/constants';

class Admin extends Model<IAdminAttributes, IAdminCreationAttributes> implements IAdminAttributes {
  declare id: number;
  declare email: string;
  declare username: string;
  declare passwordHash: string;
  declare fullName: string;
  declare role: 'super_admin' | 'admin' | 'moderator';
  declare permissions: string;
  declare twoFactorSecret: string | null;
  declare lastLogin: Date | null;
  declare loginAttempts: number;
  declare lockedUntil: Date | null;
  declare ipWhitelist: string;
  declare sessions: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  toJSON(): Record<string, unknown> {
    const values = { ...this.get() } as Record<string, unknown>;
    delete values.passwordHash;
    delete values.twoFactorSecret;
    delete values.sessions;
    return values;
  }
}

Admin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      set(value: string) {
        this.setDataValue('email', value.toLowerCase().trim());
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    role: {
      type: DataTypes.STRING,
      values: Object.values(ROLES),
      defaultValue: ROLES.ADMIN,
    },
    permissions: {
      type: DataTypes.TEXT,
      defaultValue: '[]',
      get() {
        const raw = this.getDataValue('permissions');
        if (!raw) return '[]';
        try { return JSON.parse(raw); } catch { return '[]'; }
      },
      set(value: string[] | string) {
        this.setDataValue('permissions', typeof value === 'string' ? value : JSON.stringify(value));
      },
    },
    twoFactorSecret: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    loginAttempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    lockedUntil: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ipWhitelist: {
      type: DataTypes.TEXT,
      defaultValue: '[]',
      get() {
        const raw = this.getDataValue('ipWhitelist');
        if (!raw) return '[]';
        try { return JSON.parse(raw); } catch { return '[]'; }
      },
      set(value: string[] | string) {
        this.setDataValue('ipWhitelist', typeof value === 'string' ? value : JSON.stringify(value));
      },
    },
    sessions: {
      type: DataTypes.TEXT,
      defaultValue: '[]',
      get() {
        const raw = this.getDataValue('sessions');
        if (!raw) return '[]';
        try { return JSON.parse(raw); } catch { return '[]'; }
      },
      set(value: unknown[] | string) {
        this.setDataValue('sessions', typeof value === 'string' ? value : JSON.stringify(value));
      },
    },
  },
  {
    sequelize,
    tableName: 'admins',
    hooks: {
      beforeSave: (admin: Admin) => {
        if (admin.changed('role')) {
          const rolePerms = ROLE_PERMISSIONS[admin.role as keyof typeof ROLE_PERMISSIONS] || [];
          admin.setDataValue('permissions', JSON.stringify(rolePerms));
        }
      },
    },
  }
);

export default Admin;
