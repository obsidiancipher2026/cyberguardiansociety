import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class ContactSubmission extends Model {
  declare id: number;
  declare name: string;
  declare email: string;
  declare subject: string;
  declare message: string;
  declare status: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

ContactSubmission.init(
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'new',
    },
  },
  {
    sequelize,
    tableName: 'contact_submissions',
    indexes: [
      { fields: ['status'] },
      { fields: ['createdAt'] },
    ],
  }
);

export default ContactSubmission;
