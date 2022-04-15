import * as models from "../db.js";

export const getProfile = async (req, res) => {
  const id = req.params.id;

  models.Profile.findByPk(id)
    .then(profile => {
      if (!profile) {
        res.status(404).send({ error: "No Profile with given id." })
      } else {
        res.status(200).json({ profile });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("500 - Server error");
    });
}

export const getAllProfiles = async (req, res) => {
  models.Profile.findAll()
    .then(profiles => {
      res.status(200).json(profiles);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Server error" })
    });
}

export const updateProfile = async (req, res) => {

  const id = Number(req.params.id);
  //only if the id is the own
  if (id !== req.user.user_id) {
    console.log(req.user);
    return res.status(401).json({ error: "Not authorized." })
  }
  //TODO validate data and destructure
  const obj = req.body;
  models.Profile.update(obj, {
    where: { id }
  })
    .then(count => {
      if (count[0] === 0) {
        return res.status(404).json({
          error: "No Profile with given id",
        })

      } else {
        res.status(200).send("Profile updated");
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err)
    })
}

export const deleteProfile = async (req, res) => {

  const id = Number(req.params.id);
  //only if the id is the own
  if (id !== req.user.user_id) {
    console.log(req.user);
    return res.status(401).json({ error: "Not authorized." })
  }
  models.Profile.destroy({ where: { id } })
    .then(count => {
      if (count === 0) {
        return res.status(404).json({
          error: "No Profile with given id",
        })
      } else {
        res.status(200).send("Profile deleted");
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("500 - Server error");
    })
}