import { Sequelize } from "sequelize";
const { or, like } = Sequelize.Op;
import * as models from "../db.js";
import bcrypt from "bcryptjs";

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

  const { username, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).send("Passwords don't match.")
  }
  //check if email is correct regex
  const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  console.log(emailRegEx.test(email));

  models.User.findOne({
    where: {
      [or]: [
        { username: { [like]: username } },
        { email: { [like]: email } }
      ]
    }
  })
    .then(user => {
      if (!user) {
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(password, salt, function (err, hash) {
            models.User.create({
              email,
              username,
              password: hash,
            }).then(user => {
              models.Profile.create({ user_id: user.id })
                .then(profile => {
                  res.status(201).json(profile)
                })
            })
          });
        })


      } else {
        return res.status(400).send("User already exists.")
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("500 - Server error");
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