import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class CgsContent extends Model {
  declare id: number;
  declare title: string;
  declare description: string;
  declare type: 'core-area' | 'program' | 'skill' | 'team-role';
  declare icon: string;
  declare order: number;
  declare published: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

CgsContent.init(
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
      allowNull: false,
      validate: {
        isIn: [['core-area', 'program', 'skill', 'team-role']],
      },
    },
    icon: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    published: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'cgs_content',
    indexes: [
      { fields: ['type'] },
      { fields: ['order'] },
      { fields: ['published'] },
    ],
  }
);

export default CgsContent;
