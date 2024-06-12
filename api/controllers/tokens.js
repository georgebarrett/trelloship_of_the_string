const User = require("../models/user");
const TokenGenerator = require("../models/token_generator")
const bcrypt = require('bcrypt');

const SessionsController = {

  Create: async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: email }).then(async (user) => {      
      if (!user) {
        console.log("auth error: user not found")
        return res.status(401).json({ message: "A user with this email address does not exist" });
      } 
      
      const auth = await bcrypt.compare(password, user.password);

      if (!auth) {
        console.log("auth error: passwords do not match")
        res.status(401).json({ message: "Email address and password do not match" });
      } else {
        const token = await TokenGenerator.jsonwebtoken(user.id)
        res.status(201).json({ token: token, message: "OK" });
      }
    });
  }
};

module.exports = SessionsController;
