const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

const User = require("../../models/User");

//@route POST api/users/register
//@desc Register user
//@access Public
router.post("/register", (req, res) => {
  //FORM ERROR CHECKING
  const { errors, isValid } = validateRegisterInput(req.body);

  //CHECH IF INPUT IS VALID
  if (!isValid) return res.status(400).json(errors);

  User.findOne({ email: req.body.email }).then(user => {
    if (user) return res.status(400).json({ email: "E-mail already exists" });

    //CREATE NEW USER IF USER DOESN'T EXIST
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    //HASH PASSWORD AND SAVE USER TO THE DB
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(user => res.json(user))
          .catch(err => console.log(err));
      });
    });
  });
});

//@route POST api/users/login
//@desc Login user and return JWT token
//@access Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user)
      return res.status(404).json({ emailnotfound: "E-mail not found" });

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user.id,
          name: user.name
        };

        //SIGN TOKEN
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 31556926 },
          (err, token) => {
            res.json({ success: true, token: "Bearer " + token });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

//@route GET api/users/currentuser
//@desc Return current user
//@access Private
router.get(
  "/currentuser",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
