import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize(`mysql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:3306/informatinder`);

import user from "./models/User.js";
import profile from './models/Profile.js';

const modelDefiners = [
  user,
  profile
  // Add more models here...
];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

export const { User, Profile } = sequelize.models;

//Relations
User.hasOne(Profile, {
  foreignKey: {
    type: DataTypes.INTEGER,
    allowNull: false,
    name: "user_id"
  }
});


sequelize.sync();


export default sequelize;