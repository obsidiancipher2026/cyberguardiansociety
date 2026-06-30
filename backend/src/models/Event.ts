import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { IEventAttributes, IEventCreationAttributes } from '../types';
import { EVENT_TYPES } from '../config/constants';

class Event extends Model<IEventAttributes, IEventCreationAttributes> implements IEventAttributes {
  declare id: number;
  declare title: string;
  declare description: string;
  declare image: string;
  declare eventDate: Date | null;
  declare endDate: Date | null;
  declare location: string;
  declare eventType: 'conference' | 'workshop' | 'webinar' | 'ctf' | 'meetup' | 'training';
  declare maxAttendees: number | null;
  declare registeredCount: number;
  declare speakers: string;
  declare tags: string;
  declare agendaItems: string;
  declare registrationLink: string;
  declare commentsCount: number;
  declare views: number;
  declare featured: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Event.init(
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
    eventDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    eventType: {
      type: DataTypes.STRING,
      values: [...EVENT_TYPES],
      allowNull: false,
    },
    maxAttendees: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    registeredCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    speakers: {
      type: DataTypes.TEXT,
      defaultValue: '[]',
      get() {
        const raw = this.getDataValue('speakers');
        if (!raw) return '[]';
        try { return JSON.parse(raw as string); } catch { return '[]'; }
      },
      set(value: string[] | string) {
        this.setDataValue('speakers', typeof value === 'string' ? value : JSON.stringify(value));
      },
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
    agendaItems: {
      type: DataTypes.TEXT,
      defaultValue: '[]',
      get() {
        const raw = this.getDataValue('agendaItems');
        if (!raw) return '[]';
        try { return JSON.parse(raw as string); } catch { return '[]'; }
      },
      set(value: unknown[] | string) {
        this.setDataValue('agendaItems', typeof value === 'string' ? value : JSON.stringify(value));
      },
    },
    registrationLink: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    commentsCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    featured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    tableName: 'events',
    indexes: [
      { fields: ['eventType', 'eventDate'] },
      { fields: ['createdAt'] },
    ],
  }
);

export default Event;
