import { DataTypes } from 'sequelize';

export default (sequelize) => sequelize.define(
  "Profile",
  {
    id: {
      type: DataTypes.INTEGER,
      field: 'id',
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    firstname: {
      type: DataTypes.STRING,
      field: 'firstname',
      default: ""
    },
    lastname: {
      type: DataTypes.STRING,
      field: 'lastname',
      default: ""
    },
    description: {
      type: DataTypes.STRING,
      field: 'description',
      default: ""
    },
    isBetrieb: {
      type: DataTypes.BOOLEAN,
      field: 'isBetrieb',
      default: false,
    },

  }, {
  freezeTableName: true
}
);