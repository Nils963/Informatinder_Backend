import { DataTypes } from 'sequelize';

export default (sequelize) => sequelize.define(
  "Benefit",
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
    }
  }, {
  freezeTableName: true
}
);