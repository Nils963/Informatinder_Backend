import { DataTypes } from 'sequelize';

export default (sequelize) => sequelize.define(
  "Categorie",
  {

    name: {
      type: DataTypes.STRING,
      field: 'name',
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      field: 'id',
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
  }, {
  freezeTableName: true
}
);