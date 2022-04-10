
import * as models from "../db.js";

export const getProfiles = async (req, res) => {
  models.Profile.findAll()
    .then(profiles => {
      res.status(200).json({ profiles, count: profiles.length });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("500 - Server error");
    });
}

export const getProfilesByPage = async (req, res) => {
  const { count, page } = req.body;

  const offset = (page - 1) * count;

  models.Profile.findAll({
    offset: Number(offset),
    limit: Number(count),
  })
    .then(profiles => {
      res.status(200).json(profiles);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("500 - Server error");
    });
}

