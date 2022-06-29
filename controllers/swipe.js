
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
          id: { [Op.ne]: req.user.id }
        },
        include: [models.Categorie, models.Benefit, models.Language]
      })
        .then(profiles => {
          res.status(200).json({ profiles, count: countProfiles });
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

