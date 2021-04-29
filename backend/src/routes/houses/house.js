const express = require("express");
const houseRouter = express.Router();
const houseModel = require("./houseModel");
const { auth, admin } = require("../../middleware/authMiddleware");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const multer = require("multer");


// configure cloudinary

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// get all houses

houseRouter.get("/", async (req, res, next) => {
  try {
    const houses = await houseModel
      .find(req.query)
      .populate("user", ["name", "image"]);
    // res.status(200).json({
    //     success: true,
    //     count: houses.length,
    //     data: houses
    // })
    res.status(200).send(houses);
  } catch (error) {
    next(error);
  }
});

// get houses by id
houseRouter.get("/:id", async (req, res, next) => {
  try {
    const house = await houseModel
      .findById(req.params.id)
      .populate("user", ["name", "image"]);
    if (house) {
      res.status(200).send(house);
    } else {
      const error = new Error(`house with id ${req.params.id}  not found`);
      error.httpStatusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
});

// post a house
houseRouter.post("/", auth, async (req, res, next) => {
  const house = await new houseModel({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    selfContained: req.body.selfContained,
    photo: req.body.photo,
    telephone: req.body.telephone,
    location: req.body.location,
    user: req.user.id,
  });
  const savedHouse = house.save();
  res.status(201).send(savedHouse);
});



// delete house
houseRouter.delete("/:id", auth, async (req, res, next) => {
  try {
    const house = await houseModel.findById(req.params.id);
    if (house) {
      house.remove();
      res.status(200).send(`house with id ${req.params.id} deleted`);
    } else {
      const error = new Error(`house wih id ${req.params.id} not found`);
      error.httpStatusCode = 404;
      next(error);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// edit house info
houseRouter.put("/:id", auth, async (req, res, next) => {
  try {
    const house = await houseModel.findByIdAndUpdate(req.params.id, req.body);
    delete req.user._id;
    if (house) {
      res.status(200).send(house);
    } else {
      const error = new Error(`house with id ${req.params.id} not found`);
      error.httpStatusCode = 404;
      next(error);
    }
  } catch (error) {
    next(error);
  }
});


// for upload (multiple)
const upload = multer({})
// houseRouter.post(
//   "/upload",
//   auth,
//   upload.single("avatar"),
//   async (req, res, next) => {
//     try {
//       if (req.file) {
//         const cld_upload_stream = cloudinary.uploader.upload_stream(
//           {
//             folder: "houses",
//           },
//           async (err, result) => {
//             if (!err) {
//               if (!err) {
//                 let resp = await houseModel.findByIdAndUpdate(req.user.id, {
//                   image: result.secure_url,
//                 });
//                 console.log("RES", resp)
//                 if (resp) res.status(200).send("Done");
//                 else res.sendStatus(400);
//               }
//             }
//           }
//         );
//         streamifier.createReadStream(req.file.buffer).pipe(cld_upload_stream);
//       } else {
//         const err = new Error();
//         err.httpStatusCode = 400;
//         err.message = "Image file missing!";
//         next(err);
//       }
//     } catch (error) {
//       next(error);
//     }
//   }
// );


houseRouter.post(
  "/:id/upload",
  auth,
  upload.single("avatar"),
  async (req, res, next) => {
    try {
      if (req.file) {
        const cld_upload_stream = cloudinary.uploader.upload_stream(
          {
            folder: "houses",
          },
          async (err, result) => {
            if (!err) {
              const image = result.secure_url;
              console.log("IMAGE", image);
              const house = await houseModel.findOneAndUpdate(req.params.id, {
                image,
              });
              //user.save()
              if (house) {
                await house.save();
                res.status(200).send(house.image);
              } else {
                const error = new Error(`house id ${req.user.id} not found`);
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

module.exports = houseRouter;
