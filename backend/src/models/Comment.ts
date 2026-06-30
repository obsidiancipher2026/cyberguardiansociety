import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { ICommentAttributes, ICommentCreationAttributes } from '../types';
import { TARGET_TYPES } from '../config/constants';

class Comment extends Model<ICommentAttributes, ICommentCreationAttributes> implements ICommentAttributes {
  declare id: number;
  declare targetId: number;
  declare targetType: 'news' | 'threat' | 'event' | 'course';
  declare authorName: string;
  declare authorEmail: string;
  declare content: string;
  declare approved: boolean;
  declare flagged: boolean;
  declare replies: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    targetId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    targetType: {
      type: DataTypes.STRING,
      values: [...TARGET_TYPES],
      allowNull: false,
    },
    authorName: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    authorEmail: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    approved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    flagged: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    replies: {
      type: DataTypes.TEXT,
      defaultValue: '[]',
      get() {
        const raw = this.getDataValue('replies');
        if (!raw) return '[]';
        try { return JSON.parse(raw as string); } catch { return '[]'; }
      },
      set(value: unknown[] | string) {
        this.setDataValue('replies', typeof value === 'string' ? value : JSON.stringify(value));
      },
    },
  },
  {
    sequelize,
    tableName: 'comments',
    indexes: [
      { fields: ['targetId', 'targetType'] },
      { fields: ['approved', 'createdAt'] },
    ],
  }
);

export default Comment;
