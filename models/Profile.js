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
    },
    lastname: {
      type: DataTypes.STRING,
      field: 'lastname',
    },
    description: {
      type: DataTypes.STRING,
      field: 'description',
    },
    isBetrieb: {
      type: DataTypes.BOOLEAN,
      field: 'isBetrieb',
      default: false,
      allowNull: false
    },

  }, {
  freezeTableName: true
}
);