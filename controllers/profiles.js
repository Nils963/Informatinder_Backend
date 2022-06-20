import * as models from "../db.js";

export const getProfile = async (req, res) => {
  if (req.params.id === undefined) {
    return res.status(400).json({ error: "No Id given." })
  }
  const id = Number(req.params.id);

  let profile;
  let languages;
  let benefits;

  await models.Profile.findByPk(id)
    .then(profil => {
      if (!profil) {
        res.status(404).json({ error: "No Profile with given id." })
      } else {
        profile = profil;
        console.log();
        return profile.getLanguages()
      }
    })
    .then(lang => {
      languages = lang;
      return profile.getBenefits()
    })
    .then(bene => {
      benefits = bene;
      return profile.getCategories()
    })
    .then(cate => {
      return res.status(200).json({
        profile, languages, benefits, categories: cate
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "500 - Server error" });
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

export const uploadImage = async (req, res) => {

  if (req.is("multipart/form-data")) {
    if (!req.file) {
      return res.status(400).json({ error: "No file received" })

    } else {
      let profileId = -1;
      try {
        profileId = Number(req.user.profile_id);
      } catch (error) {
        return res.status(400).json({ error: "Unauthorized" })
      }
      models.Profile.update({
        image: "/public/" + req.file.filename
      }, {
        where: { id: profileId }
      })
        .then(count => {
          if (count[0] === 0) {
            return res.status(404).json({
              error: "No Profile was updated",
            })

          } else {
            return res.status(200).json({ success: true })//send("<img src=\"/public/" + req.file.filename + "\"></img>")
          }
        })
    }
  }
}

export const updateProfile = async (req, res) => {

  const id = Number(req.params.id);
  //only if the id is the own
  if (id !== req.user.id) {
    console.log(req.user);
    return res.status(401).json({ error: "Not authorized." })
  }
  //TODO validate data
  models.Profile.update({
    name: req.body.name,
    description: req.body.description,
    isBetrieb: req.body.isBetrieb,
    website: req.body.website,
    location: req.body.location,
    experience: req.body.experience,
  }, {
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
  if (id !== req.user.id) {
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