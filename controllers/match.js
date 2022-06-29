import * as models from "../db.js";
import { Op } from "sequelize"

export const getMatches = async (req, res) => {
  const user = req.user;
  if (user === undefined) {
    return res.status(401).json({ error: "Unauthorized" })
  }
  let val = await models.Match.findAll({
    where: {
      accepted: true,
      [Op.or]: [{ requester: user.id }, { responser: user.id }],
    }
  })
  let profiles = [];
  if (val.length > 0) {
    for (let i = 0; i < val.length; i++) {
      const ele = val[i];
      const matchedId = req.user.id === ele.requester ? ele.responser : ele.requester
      let profile = await models.Profile.findByPk(matchedId, {
        include: [models.Categorie, models.Benefit, models.Language]
      })
      profiles.push(profile)
    }
  }
  return res.status(200).json({ count: val.length, profiles: profiles })

}

export const like = async (req, res) => {
  const user = req.user;
  const { id } = req.params;
  if (Number(id) === user.id) {
    return res.status(400).json({ error: "You cant match yourself." })
  }
  models.Match.findAll({
    where: {
      [Op.or]: [{ requester: user?.id, responser: Number(id) }, { requester: Number(id), responser: user.id }],
    }
  }).then(val => {
    if (val.length === 0) {
      models.Match.create({ requester: user.id, responser: id, accepted: false })
    } else {
      models.Match.update({ accepted: true }, {
        where: {
          [Op.or]: [{ requester: user?.id, responser: Number(id) }, { requester: Number(id), responser: user.id }],
        }
      })
    }
  }).then(match => {
    return res.status(200).send();
  })
    .catch(err => console.log(err))
}

export const dislike = async (req, res) => {
  const user = req.user;
  if (user === undefined) {
    return res.status(401).json({ error: "Unauthorized" })
  }
  const { id } = req.params;
  models.Match.destroy({
    where: {
      [Op.or]: [{ requester: user?.id, responser: Number(id) }, { requester: Number(id), responser: user.id }],
    }
  })
  return res.status(200).send();
}