import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { IThreatIntelAttributes, IThreatIntelCreationAttributes } from '../types';
import { SEVERITIES, THREAT_TYPES } from '../config/constants';

class ThreatIntel extends Model<IThreatIntelAttributes, IThreatIntelCreationAttributes> implements IThreatIntelAttributes {
  declare id: number;
  declare title: string;
  declare description: string;
  declare type: 'malware' | 'vulnerability' | 'apt' | 'ransomware' | 'zero-day';
  declare severity: 'low' | 'medium' | 'high' | 'critical';
  declare cvssScore: number | null;
  declare cveId: string;
  declare affectedSystems: string;
  declare indicators: string;
  declare mitigation: string;
  declare references: string;
  declare discoveredDate: Date | null;
  declare disclosedDate: Date | null;
  declare sources: string;
  declare commentsCount: number;
  declare views: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

ThreatIntel.init(
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
      values: [...THREAT_TYPES],
      allowNull: false,
    },
    severity: {
      type: DataTypes.STRING,
      values: [...SEVERITIES],
      allowNull: false,
    },
    cvssScore: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    cveId: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    affectedSystems: {
      type: DataTypes.TEXT,
      defaultValue: '[]',
      get() {
        const raw = this.getDataValue('affectedSystems');
        if (!raw) return '[]';
        try { return JSON.parse(raw as string); } catch { return '[]'; }
      },
      set(value: string[] | string) {
        this.setDataValue('affectedSystems', typeof value === 'string' ? value : JSON.stringify(value));
      },
    },
    indicators: {
      type: DataTypes.TEXT,
      defaultValue: '[]',
      get() {
        const raw = this.getDataValue('indicators');
        if (!raw) return '[]';
        try { return JSON.parse(raw as string); } catch { return '[]'; }
      },
      set(value: string[] | string) {
        this.setDataValue('indicators', typeof value === 'string' ? value : JSON.stringify(value));
      },
    },
    mitigation: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
    references: {
      type: DataTypes.TEXT,
      defaultValue: '[]',
      get() {
        const raw = this.getDataValue('references');
        if (!raw) return '[]';
        try { return JSON.parse(raw as string); } catch { return '[]'; }
      },
      set(value: string[] | string) {
        this.setDataValue('references', typeof value === 'string' ? value : JSON.stringify(value));
      },
    },
    discoveredDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    disclosedDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    sources: {
      type: DataTypes.TEXT,
      defaultValue: '[]',
      get() {
        const raw = this.getDataValue('sources');
        if (!raw) return '[]';
        try { return JSON.parse(raw as string); } catch { return '[]'; }
      },
      set(value: string[] | string) {
        this.setDataValue('sources', typeof value === 'string' ? value : JSON.stringify(value));
      },
    },
    commentsCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'threat_intel',
    indexes: [
      { fields: ['createdAt'] },
      { fields: ['type', 'severity'] },
    ],
  }
);

export default ThreatIntel;
