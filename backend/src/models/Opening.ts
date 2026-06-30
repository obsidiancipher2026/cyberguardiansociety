import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Opening extends Model {
  declare id: number;
  declare title: string;
  declare description: string;
  declare type: string;
  declare tags: string;
  declare status: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Opening.init(
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
    type: {
      type: DataTypes.STRING,
      defaultValue: 'Volunteer',
    },
    tags: {
      type: DataTypes.TEXT,
      defaultValue: '[]',
      get() {
        const raw = this.getDataValue('tags');
        if (!raw) return '[]';
        try { return JSON.parse(raw as string); } catch { return '[]'; }
      },
      set(value: string[] | string) {
        this.setDataValue('tags', typeof value === 'string' ? value : JSON.stringify(value));
      },
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'open',
    },
  },
  {
    sequelize,
    tableName: 'openings',
    indexes: [
      { fields: ['type', 'status'] },
      { fields: ['createdAt'] },
    ],
  }
);

export default Opening;
