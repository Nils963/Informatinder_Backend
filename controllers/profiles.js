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
        return res.status(404).json({ error: "No Profile with given id." })
      } else {
        profile = profil;
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

const validateUpdate = body => {
  let errors = 0;
  if (body.name == undefined || body.name == "") {
    errors++;
  }
  if (body.description == undefined) {
    errors++;
  }
  if (body.website == undefined) {
    errors++;
  }
  if (body.languages == undefined) {
    errors++;
  }
  if (body.categories == undefined) {
    errors++;
  }
  if (body.contact == undefined) {
    errors++;
  }

  return errors === 0
}

export const updateProfile = async (req, res) => {

  const id = Number(req.params.id);
  //only if the id is the own
  if (id !== req.user.id) {
    return res.status(401).json({ error: "Not authorized." })
  }
  if (!validateUpdate(req.body)) {
    return res.status(400).json({ error: "Update could not be validated." })
  }
  const profile = await models.Profile.findOne({
    where: { id }
  })
  models.Profile.update({
    name: req.body.name,
    description: req.body.description,
    website: req.body.website,
    location: req.body.location,
    contact: req.body.contact,
  }, {
    where: { id }
  })
    .then(count => {
      if (count[0] === 0) {
        return res.status(404).json({
          error: "No Profile with given id",
        })

      } else {
        //set languages
        const langs = JSON.parse(req.body.languages)
        for (let key in langs) {
          models.Language.findOne({ where: { name: key } })
            .then(lang => {
              if (lang == undefined) {
                models.Language.create({
                  name: key,
                  experience: langs[key],
                  profile_id: req.user.profile_id,
                }).then(lang => {
                  profile.addLanguage(lang.dataValues.id)
                })
              } else {
                profile.addLanguage(lang.dataValues.id)
              }
            })

        }
        const categories = JSON.parse(req.body.categories)
        for (let cate in categories) {
          models.Categorie.findOne({ where: { name: categories[cate] } })
            .then(categorie => {
              if (categorie == undefined) {
                models.Categorie.create({ name: categories[cate] })
                  .then(catego => {
                    profile.addCategorie(catego.dataValues.id)
                  })
              }
              profile.addCategorie(categorie.dataValues.id)
            })
            .catch(err => {
            })
        }

        if (req.body.benefits != undefined) {
          const benefits = JSON.parse(req.body.benefits)
          for (let bene in benefits) {
            models.Benefit.findOne({ where: { name: benefits[bene] } })
              .then(benefit => {
                if (benefit == undefined) {
                  models.Benefit.create({ name: benefits[bene] })
                    .then(benefit => {
                      profile.addBenefit(benefit.dataValues.id)
                    })
                }
                profile.addBenefit(benefit.dataValues.id)
              })
              .catch(err => {
              })
          }
        }

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