import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(`mysql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:3306/informatinder`);

import User from "./models/User.js"

const modelDefiners = [
  User
  // Add more models here...
];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}
sequelize.sync();


export default sequelize;