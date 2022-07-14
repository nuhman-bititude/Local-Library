var Users = require("../models/users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.userCreate = async (req, res, next) => {
  try {
    const user = await Users.findOne({ email: req.body.email.toLowerCase() });
    if (user) {
      return res.status(400).send({ message: "User Already exist" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new Users({
      name: req.body.name,
      email: req.body.email.toLowerCase(),
      password: hashPassword,
      type: "user",
    });
    newUser.save(function (err) {
      if (err) {
        console.log(err);
        res.status(404).json({ err });
        return;
      }
      res.status(201).send({ message: "User Created" });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
    res.json(error);
  }
};

exports.userFetchAll = (req, res, next) => {
  Users.find().exec((err, all_users) => {
    if (err) {
      res.status(404).json({ err });
      console.log(err);
      return;
    }
    res.json(all_users);
  });
};

exports.userFetchOne = async (req, res, next) => {
  try {
    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    const user = await Users.findOne({ email: email });
    if (!user) {
      return res.status(401).send("User not Found");
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).send("Invalid Password");
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_PRIVATE_KEY);
    res
      .status(200)
      .json({
        email: user.email,
        name: user.name,
        userType: user.user_type,
        token: token,
      });
  } catch (error) {
    console.log(error);
    //TODO:Handle error res.status(500).send({ message: "Internal server error" });
    res.status(404).send(error);
  }
};

exports.adminCreate = (req, res, next) => {
  try {
    var admin = new Users({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      user_type: "admin",
    });
    admin.save(function (err) {
      if (err) {
        res.status(404).json({ err });
        return;
      }
      res.send(admin);
    });
  } catch (error) {
    res.json(error);
  }
};

exports.adminFetchOne = async (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  const data = await Users.findOne({ email: email });
  if (data === null) {
    res.json("no admin found");
  } else {
    if (
      data.email === email &&
      data.password === password &&
      data.user_type === "admin"
    ) {
      res.json(true);
    } else res.json("wrong password");
  }
};
