var Users = require("../models/users");

exports.userCreate = async (req, res, next) => {
  try {
    const user = await Users.findOne({ email: req.body.email.toLowerCase() });
    if (user) {
      return res.status(400).send({ message: "User Already exist" });
    }
    const newUser = new Users({
      name: req.body.name,
      email: req.body.email.toLowerCase(),
      password: req.body.password,
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
  let email = req.body.email.toLowerCase();
  let password = req.body.password;
  try {
    const user = await Users.find({ email: email });
    if (!user) {
      return res.status(401).send({ message: "User not Found" });
    }
    const validPassword = await Users.findOne({ email, password });
    if (!validPassword) {
      res.status(401).send({ message: "wrong password" });
    }
    const token = await Users.generateAuthToken();
    res.status(200).send({ data: token, message: "login success" });
  } catch (error) {
    console.log(error);
    // res.status(500).send({ message: "Internal server error" });
  }
};
// exports.userFetchOne = async (req, res, next) => {
//   let email = req.body.email;
//   let password = req.body.password;
//   const data = await Users.findOne({ email: email });
//   if (data === null) res.json("no user found");
//   else {
//     if (
//       data.email === email &&
//       data.password === password &&
//       data.user_type === "user"
//     )
//       res.json(true);
//     else {
//       res.json("wrong password");
//     }
//   }
// };

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
