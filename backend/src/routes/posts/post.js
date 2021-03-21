const express = require("express");
const PostModel = require("./postSchema");
const UserModel = require("../users/userModel");
const postRouter = express.Router();
const multer = require("multer");
const upload = multer({});
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const { auth } = require("../../middleware/authMiddleware");

// create post
postRouter.post("/", auth, async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.user.id).select("-password");
        const newPost = new PostModel({
            text: req.body.text,
            name: user.name,
            image: req.body.image,
            user: req.user.id,
        });

        const post = await newPost.save();
        res.json(post);
    } catch (error) {
        next(error);
    }
});

// Get all the logged in user  posts

postRouter.get("/", auth, async (req, res, next) => {
    try {
        const posts = await PostModel.find(req.query).sort({ date: -1 });
        res.json(posts);
    } catch (error) {
        next(error);
    }
});

// @route GET api/posts/:id
// @desc get post by id

postRouter.get("/:id", auth, async (req, res, next) => {
    try {
        const post = await PostModel.findById(req.params.id).sort({ date: -1 });
        if (post) {
            return res.status(200).json(post);
        } else {
            const error = new Error();
            error.httpStatusCode = 404;
            next(error);
        }
    } catch (error) {
        next(error);
    }
});

// @route delete /posts/:id
// @desc delete a post
// @access private

postRouter.delete("/:id", auth, async (req, res, next) => {
    try {
        const post = await PostModel.findById(req.params.id);

        // check user. We convert the post id to string
        if (!post) {
            return res.status(404).json({ msg: "post not found" });
        }
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "user not authorized" });
        }

        await post.remove();
        res.json({ msg: "post removed" });
    } catch (error) {
        next(error);
    }
});

// delete post admin

postRouter.delete("/admin/:id", auth, async (req, res, next) => {
    try {
        const post = await PostModel.findById(req.params.id);

        // check user. We convert the post id to string
        if (!post) {
            return res.status(404).json({ msg: "post not found" });
        }

        await post.remove();
        res.json({ msg: "post removed" });
    } catch (error) {
        next(error);
    }
});

// @route PUT /posts/like/:id
// @desc like a post
// @access private

postRouter.put("/like/:id", auth, async (req, res, next) => {
    try {
        const post = await PostModel.findById(req.params.id);
        // check if post has already been liked
        if (
            post.likes.filter((like) => like.user.toString() === req.user.id).length >
            0
        ) {
            return res.status(400).json({ msg: "post has already been liked" });
        } else {
            post.likes.unshift({ user: req.user.id });
        }

        await post.save();
        res.json(post.likes);
    } catch (error) {
        next(error);
    }
});

// @route PUT /posts/unlike/:id
// @desc unlike a post
// @access private

postRouter.put("/unlike/:id", auth, async (req, res, next) => {
    try {
        const post = await PostModel.findById(req.params.id);
        // check if post has already been liked
        if (
            post.likes.filter((like) => like.user.toString() === req.user.id)
                .length === 0
        ) {
            return res.status(400).json({ msg: "post has not yet been liked" });
        } else {
            //get removeindex

            const removeIndex = post.likes
                .map((like) => like.user.toString())
                .indexOf(req.user.id);
            post.likes.splice(removeIndex, 1);

            await post.save();
            res.json(post.likes);
        }
    } catch (error) {
        next(error);
    }
});

// @route POST /posts/comment/:id
// @desc comment on post
// @access private
postRouter.post("/comment/:id", auth, async (req, res, next) => {
    try {
        const user = await UserModel.findById(req.user.id).select("-password");
        const post = await PostModel.findById(req.params.id);
        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id,
        };

        post.comments.unshift(newComment);
        await post.save();
        res.json(post.comments);
    } catch (error) {
        next(error);
    }
});

// @route DELETE /posts/comment/:id/:comment_id
// @desc Delete Comment
// @access private

postRouter.delete("/comment/:id/:comment_id", auth, async (req, res, next) => {
    try {
        const post = await PostModel.findById(req.params.id);
        // pull out comment
        const comment = post.comments.find(
            (comment) => comment.id === req.params.comment_id
        );
        // Make sure comment exists
        if (!comment) {
            return res.status(404).json({ msg: "Comment does not exist" });
        }

        // check user to see if it is the same user who commented
        if (comment.user.toString() !== req.user.id) {
            return res.status(404).json({ msg: "User not authoried" });
        }

        // get remove index

        const removeIndex = post.comments
            .map((comment) => comment.user.toString())
            .indexOf(req.user.id);
        post.comments.splice(removeIndex, 1);

        await post.save();
        res.json(post.comments);
    } catch (error) {
        next(error);
    }
});

// for upload (multiple)
postRouter.post(
    "/:id/upload",
    auth,
    upload.single("avatar"),
    async (req, res, next) => {
        try {
            if (req.file) {
                const cld_upload_stream = cloudinary.uploader.upload_stream(
                    {
                        folder: "posts",
                    },
                    async (err, result) => {
                        if (!err) {
                            if (!err) {
                                let resp = await PostsModel.findByIdAndUpdate(req.params.id, {
                                    image: result.secure_url,
                                });
                                if (resp) res.status(200).send("Done");
                                else res.sendStatus(400);
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

module.exports = postRouter;
