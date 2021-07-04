const user = require("../models/user");
const bcrypt = require("bcryptjs");
const { initJwt } = require("../helpers/initJwt");

const newUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let User = await user.findOne({ email });
    if (User) {
      return res.status(400).json({
        ok: false,
        msg: "Please choose another email",
      });
    }
    User = new user(req.body);

    salt = bcrypt.genSaltSync();
    hash = bcrypt.hashSync(User.password, salt);
    User.password = hash;

    await User.save();

    const token = await initJwt(User.id, User.name);

    res.status(201).json({
      ok: true,
      uid: User.id,
      name: User.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "user not available",
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const User = await user.findOne({ email });
  if (!User) {
    return res.status(400).json({
      ok: false,
      msg: "Email/Password invalid",
    });
  }

  const validPassword = bcrypt.compareSync(password, User.password);

  if (!validPassword) {
    return res.status(400).json({
      ok: false,
      msg: "Password invalid",
    });
  }

  const token = await initJwt(User.id, User.name);

  res.status(201).json({
    ok: true,
    uid: User.id,
    name: User.name,
    token,
  });
};

const renew = async (req, res) => {
  const { uid, name } = req;

  const token = await initJwt(uid, name);

  res.json({
    ok: true,
    uid,
    name,
    token,
  });
};

module.exports = {
  newUser,
  login,
  renew,
};
