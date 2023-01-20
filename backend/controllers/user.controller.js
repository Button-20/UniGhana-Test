const { sign } = require("jsonwebtoken");
const User = require("../models/user.model");

// Create and Save a new User
exports.create = async (req, res) => {
  return await new Promise(async (resolve, reject) => {
    try {
      const user = new User(req.body);
      user.save((err, doc) => {
        if (!err) {
          res.status(201).send({
            message: "User created successfully",
            user: doc,
          });
          resolve(doc);
        } else if (err.code === 11000) {
          res.status(400).send({
            message: "User already exists",
          });
          resolve(false);
        } else {
          res.status(400).send({
            message:
              err.message || "Some error occurred while creating the User.",
          });
          resolve(false);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
};

// Authenticate for login and return a JWT token
exports.authenticate = async (req, res) => {
  return await new Promise(async (resolve, reject) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        res.status(400).send({ message: "User not found" });
        resolve(false);
      }

      const isMatch = await user.comparePassword(req.body.password);
      if (!isMatch) {
        res.status(400).send({ message: "Password is incorrect" });
        resolve(false);
      }

      const token = sign({ id: user._id }, 
          process.env.JWT_SECRET
        , {
          expiresIn: 
            process.env.JWT_EXP
        });
      res.status(200).send({
        message: "Login successful",
        token: token,
      });
      resolve({
        ...user.toJSON(),
        token,
      });
    } catch (error) {
      reject(error);
    }
  });
};

// Get user profile by id
exports.profile = async (req, res) => {
  return await new Promise(async (resolve, reject) => {
    try {
      const user = await User.findById(req._id, { password: 0 });
      if (!user) {
        res.status(404).send({ message: "User not found" });
        resolve(false);
      }
      res.status(200).send(user);
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};
