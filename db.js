import { Sequelize, DataTypes } from 'sequelize';

let sequelize;
if (process.env.NODE_ENV === "test") {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'tests/testsdb.sqlite',
    database: "informatinder",
    logging: false
  });
} else {
  sequelize = new Sequelize(`mysql://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:3306/InformaTinder`, {
    logging: false,
  });
}



import user from "./models/User.js";
import profile from './models/Profile.js';
import match from './models/Match.js';
import language from './models/Language.js';
import categorie from './models/Categorie.js';
import benefit from './models/Benefit.js';

const modelDefiners = [
  user,
  profile,
  match,
  language,
  categorie,
  benefit,
  // Add more models here...
];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}


export const { User, Profile, Match, Language, Benefit, Categorie } = sequelize.models;
//Relations
User.hasMany(Profile, {
  foreignKey: {
    type: DataTypes.INTEGER,
    allowNull: false,
    name: "user_id"
  }
});
Profile.hasMany(Language, {
  foreignKey: {
    type: DataTypes.INTEGER,
    allowNull: false,
    name: "profile_id"
  },
})
Categorie.belongsToMany(Profile, { through: "ProfileCategories" });
Benefit.belongsToMany(Profile, { through: "ProfileBenefits" });

sequelize.sync();

export const db = sequelize;