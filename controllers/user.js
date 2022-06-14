import * as models from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { email, password } = req.body;
  models.User.findOne({
    where: { email }
  })
    .then(user => {
      if (!user) {
        return res.status(400).send(`No user with the email ${email}.`);
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.log(err);
        }
        if (result) {
          const token = jwt.sign({ id: user.id, username: user.username, email }, process.env.JWT_SECRET, { expiresIn: "30d" }) //for testing purposes. CHANGE for prod
          res.status(200).json({ token, user })
        } else {
          return res.status(401).json({ error: "Bad credentials." })
        }
      })
    })

}

export const register = async (req, res) => {
  const { username, email, password, confirmPassword, isBetrieb } = req.body;
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
                models.Profile.create({
                  user_id: user.id,
                  name: username,
                  description: "",
                  isBetrieb: (isBetrieb == "true"),
                  image: "",
                  website: "",
                  location: "",
                  experience: -1
                })
                  .then(profile => {
                    const token = jwt.sign({ id: user.id, username, email }, process.env.JWT_SECRET, { expiresIn: "30d" }) //for testing purposes. CHANGE for prod
                    res.status(201).json({ token, user, profile })
                  })
              })
            });
          })
        } else {
          return res.status(400).send({ error: "User already exists." })
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).send("500 - Server error");
      })
  } else {
    return res.status(400).send({ error: "No valid email address." })
  }

}


export const getOneUser = async (req, res) => {
  const id = req.params.id;

  models.User.findByPk(id)
    .then(user => {
      if (!user) {
        res.status(404).send({ error: "No User with given id" })
      } else {
        res.status(200).json({ user });
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
      if (user[0] === 0) {
        return res.status(404).json({ error: "No user found." })
      }
      res.status(200).json({ user })
    })
    .catch(err => {
      if (err.errors[0].type === "unique violation") {
        return res.status(400).json({ error: "Unique violation." })
      }
      res.status(500).json({ error: "Server error" })
    })
}

export const deleteUser = async (req, res) => {

  const id = req.params.id;
  models.User.destroy({ where: { id } })
    .then(count => {
      if (count === 0) return res.status(404).json({ error: "No user found" })
      models.Profile.destroy({ where: { user_id: id } })
      res.status(200).send("User deleted");
    })
    .catch(err => {
      console.log(err);
      res.status(500).send("500 - Server error");
    })
}