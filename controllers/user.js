import { Sequelize } from "sequelize";
import * as models from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const auth = async (req, res) => {
  const { isLogin, username, email, password, confirmPassword } = req.body;
  if (isLogin === 1) {
    models.User.findOne({ username })
      .then(user => {
        if (!user) {
          return res.status(400).send(`No user with the username ${username}.`);
        }
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            console.log(err);
          }
          if (result) {
            const token = jwt.sign({ id: user._id, username, email }, process.env.JWT_SECRET, { expiresIn: "30d" }) //for testing purposes. CHANGE for prod
            res.status(200).json({ token, user })
          } else {
            return res.status(400).send("Bad credentials.")
          }
        })
      })
  }
  else {  //REGISTER
    if (password !== confirmPassword) {
      return res.status(400).send("Passwords don't match.")
    }
    const emailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

    if (emailRegEx.test(email)) {
      models.User.findOne({
        where: { username, email }
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
                      const token = jwt.sign({ user_id: user.id, username, email }, process.env.JWT_SECRET, { expiresIn: "30d" }) //for testing purposes. CHANGE for prod
                      res.status(201).json({ token, profile })
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
    } else {
      return res.status(400).send("No valid email address")
    }


  }
}


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
      res.status(200).json({ user });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("500 - Server error");
    });
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