const express = require("express");
const router = express.Router();

const Post = require("../models/post");

// posts index route
router.get("/", async (req, res) => {
  try {
    const posts = await Post.all;
    res.status(200).json({ posts });
  } catch (err) {
    res.status(500).json({ err });
  }
});

// post show route
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findPostById(parseInt(req.params.id));
    res.json(post);
  } catch (err) {
    res.status(404).json({ err });
  }
});

// Create post route
router.post("/", async (req, res) => {
  try {
    const post = await Post.create(
      req.body.title,
      req.body.name,
      req.body.body
    );
    res.json(post);
  } catch (err) {
    res.status(404).json({ err });
  }
});

// post update route
router.patch("/:id", async (req, res) => {
  try {
    const post = await Post.findPostById(parseInt(req.params.id));
    const updatedPost = await post.update(
      req.body.title,
      req.body.name,
      req.body.body
    );
    res.json({ post: updatedPost });
  } catch (err) {
    res.status(500).json({ err });
  }
});

// delete post route
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findPostById(parseInt(req.params.id));
    await post.destroy();
    res.status(204).json("Post deleted");
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = router;
