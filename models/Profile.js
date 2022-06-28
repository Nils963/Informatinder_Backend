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
    image: {
      type: DataTypes.STRING,
      field: 'image',
      allowNull: false,
      default: ""
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
    website: {
      type: DataTypes.STRING,
      field: 'website',
      allowNull: false,
      default: ""
    },
    location: {
      type: DataTypes.STRING,
      field: 'location',
      allowNull: false,
      default: ""
    },
    contact: {
      type: DataTypes.STRING,
      field: 'contact',
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