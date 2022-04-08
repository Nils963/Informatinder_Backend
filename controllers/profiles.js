import * as models from "../db.js";

export const getProfile = async (req, res) => {
  const id = req.params.id;

  models.Profile.findByPk(id)
    .then(profile => {
      if (!profile) {
        res.status(404).send("No Profile with given id")
      } else {
        res.status(200).json(profile);
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
      res.status(500).send("500 - Server error");
    });
}

export const createProfile = async (req, res) => {

  const obj = req.body;
  obj.user_id = req.user;
  models.Profile.create(obj)
    .then(profile => {
      console.log(profile);
      res.status(201).send("Profile created");
    })
    .catch(err => {
      console.log(err);
      if (err.errno == 1062) {
        return res.status(404);
      }
      res.status(500).send("500 - Server error");
    })
}

export const updateProfile = async (req, res) => {

  const id = req.params.id;
  const obj = req.body;
  models.Profile.update(obj, {
    where: { id }
  })
    .then(profile => {
      console.log(profile);
      res.status(200).send("Profile updated");
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("500 - Server error");
    })
}

export const deleteProfile = async (req, res) => {

  const id = req.params.id;
  models.Profile.destroy({ where: { id } })
    .then(profile => {
      res.status(200).send("Profile deleted");
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("500 - Server error");
    })
}