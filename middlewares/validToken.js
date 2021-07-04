const jwt = require("jsonwebtoken");

const validToken = (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    res.status(401).json({
      ok: false,
      msg: "token no found",
    });
  }

  try {
    // const payload = jwt.verify(token, process.env.Jwt);
    const { uid, name } = jwt.verify(token, process.env.Jwt);

    req.uid = uid;
    req.name = name;
  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: "token is invalid",
    });
  }

  next();
};

module.exports = {
  validToken,
};
