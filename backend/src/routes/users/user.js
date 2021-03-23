
const express = require("express");
const UserModel = require("./userModel");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const multer = require("multer");
const { auth, admin } = require("../../middleware/authMiddleware");
const generateToken = require("../../../src/utils/generateToken");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const userRouter = express.Router();
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//auth a user
userRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// get user profile(logged in user)
userRouter.get("/", auth, async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user.id).select("-password");
    if (user) {
      res.status(200).send(user);
    } else {
      const error = new Error(`user with id ${req.user.id} not found`);
      error.httpStatusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
});

// register user

userRouter.post("/register", async (req, res, next) => {
  const { name, email, password, isAdmin, bio } = req.body;
  try {
    const userExists = await UserModel.findOne({ email });

    if (userExists) {
      res.status(400).json({ msg: "user already exists" });
    }

    const user = await UserModel.create({
      name,
      email,
      password,
      isAdmin,
      bio
    });
    console.log("USER", user);

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        bio: user.bio,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    next(error);
  }
});

//get all users

userRouter.get("/", async (req, res, next) => {
  const users = await UserModel.find(req.query);
  console.log("USERS", users);
  if (users) {
    res.send(users);
  } else {
    res.status(400);
    throw new Error("users not found");
  }
});


// get currrent loggedin user
userRouter.get("/me", auth, async (req, res, next) => {
  try {
    const user = await UserModel.findById(req.user.id).select("-password");
    if (user) {
      res.json(user);
    } else {
      const error = new Error("user not found");
      error.httpStatusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
});

const upload = multer({});
userRouter.post(
  "/upload",
  auth,
  upload.single("profile"),
  async (req, res, next) => {
    try {
      if (req.file) {
        const cld_upload_stream = cloudinary.uploader.upload_stream(
          {
            folder: "users",
          },
          async (err, result) => {
            if (!err) {
              const image = result.secure_url;
              console.log("IMAGE", image);
              const user = await UserModel.findOneAndUpdate(req.user.id, {
                image,
              });
              //user.save()
              if (user) {
                await user.save();
                console.log("user", await user.save());
                res.status(200).send(user.image);
              } else {
                const error = new Error(`userwith id ${req.user.id} not found`);
                error.httpStatusCode = 404;
                next(error);
              }
            }
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
      } else {
        const err = new Error();
        err.httpStatusCode = 400;
        err.message = "Image file missing!";
        next(err);
      }
    } catch (error) {
      next(error);
    }
  }
);

module.exports = userRouter;
