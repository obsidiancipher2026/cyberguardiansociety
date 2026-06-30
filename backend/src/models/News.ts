import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { INewsAttributes, INewsCreationAttributes } from '../types';
import { SEVERITIES } from '../config/constants';
import { generateSlug } from '../utils/helpers';

class News extends Model<INewsAttributes, INewsCreationAttributes> implements INewsAttributes {
  declare id: number;
  declare title: string;
  declare slug: string;
  declare content: string;
  declare excerpt: string;
  declare author: string;
  declare image: string;
  declare category: string;
  declare tags: string;
  declare severity: 'low' | 'medium' | 'high' | 'critical';
  declare views: number;
  declare commentsCount: number;
  declare featured: boolean;
  declare published: boolean;
  declare publishedAt: Date | null;
  declare createdBy: number | null;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

News.init(
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
    slug: {
      type: DataTypes.STRING,
      unique: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    excerpt: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
    author: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: '',
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
    severity: {
      type: DataTypes.STRING,
      values: [...SEVERITIES],
      defaultValue: 'low',
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    commentsCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    published: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    publishedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'news',
    hooks: {
      beforeSave: (news: News) => {
        if (news.changed('title') || !news.slug) {
          news.slug = generateSlug(news.title);
          if (news.published && !news.publishedAt) {
            news.publishedAt = new Date();
          }
        }
        if (news.changed('published') && news.published && !news.publishedAt) {
          news.publishedAt = new Date();
        }
      },
    },
    indexes: [
      { fields: ['category', 'published'] },
      { fields: ['severity'] },
      { fields: ['createdAt'] },
    ],
  }
);

export default News;
