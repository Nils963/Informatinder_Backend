import { DataTypes } from 'sequelize';
import RawLanguage from './RawLanguage.js';

export default (sequelize) => sequelize.define(
  "Language",
  {
    id: {
      type: DataTypes.INTEGER,
      field: 'id',
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    language: {
      type: DataTypes.INTEGER,
      ref: RawLanguage,
      field: 'language_id',
      allowNull: false,
    },
    experience: {
      type: DataTypes.INTEGER,
      field: 'experience',
      allowNull: false,
    }
  }, {
  freezeTableName: true
}
);