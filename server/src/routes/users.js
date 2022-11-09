import express from "express";
import { Router } from "express";
import User from "../schemas/UserSchema.js";
import bcrypt from "bcrypt";
import { requireLogin } from "../middleware.js";
const app = express();
const router = Router();

router.post("/signup", async (req, res) => {
  let firstName = req.body.firstName.trim();
  let lastName = req.body.lastName.trim();
  let phone = req.body.phone.trim();
  let email = req.body.email.trim();
  let password = req.body.password;
  if (firstName && lastName && phone && email && password) {
    let user = await User.findOne({ email: email }).catch(() => {
      res.status(500).send({ message: "Something went wrong" });
    });

    if (user == null) {
      let data = req.body;
      data.password = await bcrypt.hash(password, 10);
      User.create(data)
        .then(() => {
          res.status(200).send();
        })
        .catch(() => {
          res
            .status(500)
            .send({ message: "Something went wrong, can't create user." });
        });
    } else {
      if (user.email == email) {
        res.status(400).send({ message: "Email already exists" });
      }
    }
  } else {
    res
      .status(400)
      .send({ message: "Make sure each field has a valid value." });
  }
});

router.post("/signin", async (req, res) => {
  if (req.body.email && req.body.password) {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    ).catch(() => {
      res.status(401).send({ message: "Incorrect mail or password." });
    });
    if (user != null) {
      const token = await user.generateAuthToken();
      const userData = await user.getPublicData();
      userData.token = token;
      return res.status(200).send(userData);
    }
  } else {
    res
      .status(400)
      .send({ message: "Make sure each field has a valid value." });
  }
});

router.post("/signout", requireLogin, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    res.send();
  } catch (error) {
    res.status(500).send();
  }
});

export default router;
