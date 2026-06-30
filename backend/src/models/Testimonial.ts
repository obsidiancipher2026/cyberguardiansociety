import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Testimonial extends Model {
  declare id: number;
  declare name: string;
  declare role: string;
  declare text: string;
  declare rating: number;
  declare type: string;
  declare published: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Testimonial.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 5,
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: 'student',
    },
    published: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: 'testimonials',
    indexes: [
      { fields: ['type', 'published'] },
      { fields: ['createdAt'] },
    ],
  }
);

export default Testimonial;
