const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports.getUsers = async (req, res, next) => {
  const user = await User.find();
  if (!user) {
    return res.status(404).json("User not found");
  }
  return res.status(200).json(user);
};

module.exports.register = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!(name && email && password && confirmPassword)) {
      return res.status(400).json("All fields are required");
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json("password and confirmPassword are not the same");
    }

    const ExistingUser = await User.findOne({ email: email });
    if (ExistingUser) {
      return res.status(400).json("User already exists please log in");
    }

    const encryptPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name: name,
      email: email,
      password: encryptPassword,
    });

    const Token = jwt.sign(user.toJSON(), process.env.SECRET_KEY, {
      expiresIn: "2h",
    });
    console.log(Token);
    await user.save();
    return res.status(201).json({
      name: user.name,
      userId: user._id,
      token: Token,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).json("All fields are required");
    }

    const user = await User.findOne({ email: email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const Token = jwt.sign(user.toJSON(), process.env.SECRET_KEY, {
        expiresIn: "2h",
      });

      return res.status(200).json({
        name: user.name,
        userId: user._id,
        token: Token,
        success: true,
      });
    }
    return res.status(400).json("Invalid credentials");
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
