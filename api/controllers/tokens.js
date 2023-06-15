const User = require("../models/user");
const TokenGenerator = require("../models/token_generator")

const SessionsController = {

  Create: (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }).then(async (user) => {
      if (!user) {
        res.status(401).json({ message: "A user with this email address does not exist" });
      } else if (user.password !== password) {
        res.status(401).json({ message: "Email address and password do not match" });
      } else {
        const token = await TokenGenerator.jsonwebtoken(user.id)
        res.status(201).json({ token: token, message: "OK" });
      }
    });
  }
};

module.exports = SessionsController;
