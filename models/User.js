import { DataTypes } from 'sequelize';

export default (sequelize) => sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      field: 'id',
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      field: 'email',
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      field: 'username',
    },
    password: {
      type: DataTypes.STRING,
      field: 'password',
    }
  }, {
  freezeTableName: true,
}
);