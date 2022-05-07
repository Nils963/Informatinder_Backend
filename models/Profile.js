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
    name: {
      type: DataTypes.STRING,
      field: 'name',
      allowNull: false,
      default: ""
    },
    description: {
      type: DataTypes.STRING,
      field: 'description',
      allowNull: false,
      default: ""
    },
    isBetrieb: {
      type: DataTypes.BOOLEAN,
      field: 'isBetrieb',
      allowNull: false,
      default: false,
    },

  }, {
  freezeTableName: true
}
);