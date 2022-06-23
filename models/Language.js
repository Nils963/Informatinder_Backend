import { DataTypes } from 'sequelize';

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
    name: {
      type: DataTypes.STRING,
      field: 'name',
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