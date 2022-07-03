
import * as models from "../db.js";
import { Op } from "sequelize"

export const getProfilesByPage = async (req, res) => {
  let { count, page } = req.params;
  if (page < 1) {
    page = 1
  }
  const offset = (page - 1) * count;

  models.Profile.count().then(countProfiles => {
    if (countProfiles > (page - 1) * count) {
      models.Profile.findAll({
        offset: Number(offset),
        limit: Number(count),
        where: {
          id: { [Op.ne]: req.user.id },
          isBetrieb: !req.user.isBetrieb
        },
        include: [models.Categorie, models.Benefit, models.Language]
      })
        .then(profiles => {
          let response = [];
          profiles.forEach(profile => {
            let languages = profile.Languages.map(element => {
              return { name: element.name, experience: element.experience }
            });
            let benefits = profile.Benefits.map(element => element.name);
            let categories = profile.Categories.map(element => element.name);
            response.push({ profile, languages, benefits, categories })
          })
          res.status(200).json({ profiles: response, count: countProfiles });
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ error: "Server error", count: countProfiles })
        });
    } else {
      return res.status(404).send({ error: "No ressources", count: countProfiles })
    }
  })


}

