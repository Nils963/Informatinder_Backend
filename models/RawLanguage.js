import { DataTypes } from 'sequelize';

export default (sequelize) => sequelize.define(
  "RawLanguage",
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
    icon: {
      type: DataTypes.STRING,
      field: 'icon',
      allowNull: false,
    }
  }, {
  freezeTableName: true
}
);