import { DataTypes } from 'sequelize';
import Profile from './Profile.js';

export default (sequelize) => sequelize.define(
  "Match",
  {
    id: {
      type: DataTypes.INTEGER,
      field: 'id',
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    requester: {
      type: DataTypes.INTEGER,
      field: 'requester',
      ref: Profile,
      allowNull: false,
    },
    responser: {
      type: DataTypes.INTEGER,
      field: 'responser',
      ref: Profile,
      allowNull: false,
    },
    accepted: {
      type: DataTypes.BOOLEAN,
      field: 'accepted',
      allowNull: false,
      default: false,
    },
  }, {
  freezeTableName: true
}
);