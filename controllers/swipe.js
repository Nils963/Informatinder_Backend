
import * as models from "../db.js";

export const getProfilesByPage = async (req, res) => {
  let { count, page } = req.params;
  if (page < 1) {
    page = 1
  }
  const offset = (page - 1) * count;
  let response = {
    profiles: [],
    count: 0
  };

  models.Profile.count().then(countProfiles => {
    if (countProfiles > (page - 1) * count) {
      console.log(countProfiles);
      models.Profile.findAll({
        offset: Number(offset),
        limit: Number(count),
      })
        .then(profiles => {
          console.log(profiles);
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

