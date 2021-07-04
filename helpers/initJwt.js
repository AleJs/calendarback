const jwt = require("jsonwebtoken");

const initJwt = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid, name };

    jwt.sign(
      payload,
      process.env.Jwt,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          reject("Problemn with the token, please refresh");
        }
        resolve(token);
      }
    );
  });
};

module.exports = {
  initJwt,
};
