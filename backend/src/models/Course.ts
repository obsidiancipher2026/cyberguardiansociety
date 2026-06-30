import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { ICourseAttributes, ICourseCreationAttributes } from '../types';
import { COURSE_LEVELS } from '../config/constants';

class Course extends Model<ICourseAttributes, ICourseCreationAttributes> implements ICourseAttributes {
  declare id: number;
  declare title: string;
  declare description: string;
  declare image: string;
  declare instructor: string;
  declare level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  declare duration: number;
  declare category: string;
  declare modules: string;
  declare prerequisites: string;
  declare price: number;
  declare enrolledCount: number;
  declare rating: number;
  declare tags: string;
  declare commentsCount: number;
  declare published: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Course.init(
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
    image: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    instructor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    level: {
      type: DataTypes.STRING,
      values: [...COURSE_LEVELS],
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    modules: {
      type: DataTypes.TEXT,
      defaultValue: '[]',
      get() {
        const raw = this.getDataValue('modules');
        if (!raw) return '[]';
        try { return JSON.parse(raw as string); } catch { return '[]'; }
      },
      set(value: unknown[] | string) {
        this.setDataValue('modules', typeof value === 'string' ? value : JSON.stringify(value));
      },
    },
    prerequisites: {
      type: DataTypes.TEXT,
      defaultValue: '[]',
      get() {
        const raw = this.getDataValue('prerequisites');
        if (!raw) return '[]';
        try { return JSON.parse(raw as string); } catch { return '[]'; }
      },
      set(value: string[] | string) {
        this.setDataValue('prerequisites', typeof value === 'string' ? value : JSON.stringify(value));
      },
    },
    price: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    enrolledCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
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
    commentsCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'courses',
    indexes: [
      { fields: ['level', 'category'] },
      { fields: ['createdAt'] },
    ],
  }
);

export default Course;
