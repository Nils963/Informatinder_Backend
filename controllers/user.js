import * as models from "../db.js";

export const getOneUser = async (req, res) => {
  const id = req.params.id;

  models.User.findByPk(id)
    .then(user => {
      if (!user) {
        res.status(404).send("No User with given id")
      } else {
        res.status(200).json(user);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("500 - Server error");
    });
}

export const getAllUsers = async (req, res) => {

  models.User.findAll()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("500 - Server error");
    });
}

export const createUser = async (req, res) => {

  const obj = req.body;
  //TODO validate
  models.User.create(obj)
    .then(user => {
      models.Profile.create({ user_id: user.id })
        .then(profile => {
          res.status(201).json(profile)
        })
    })
    .catch(err => {
      if (err.errors[0].validatorKey == "not_unique") {
        res.status(404).send('Not unique')
      } else {
        console.log();
        res.status(500).send("500 - Server error");

      }
    })
}

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const obj = req.body;
  models.User.update(obj, {
    where: { id }
  })
    .then(user => {
      console.log(user);
      res.status(201).send("User updated");
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("500 - Server error");
    })
}

export const deleteUser = async (req, res) => {

  const id = req.params.id;
  models.User.destroy({ where: { id } })
    .then(user => {
      models.Profile.destroy({ where: { user_id: id } })
      res.status(201).send("User deleted");
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("500 - Server error");
    })
}