const express = require("express");
const Post = require("../models/post");
const { post } = require("./categories");

const postRouter = express.Router();

postRouter.post("/", async (req, res) => {
  const { title, content, category_id } = req.body;
  const { error: validationError } = Post.validatePost({
    title,
    content,
    category_id,
  });

  if (validationError) {
    res.status(422).json({ errors: validationError.details });
  } else {
    try {
      const id = await Post.createPost({ title, content, category_id });
      res.send({ title, content, category_id });
    } catch (err) {
      console.error(err);
      res.status(500).send("Game Over with this post");
    }
  }
});

postRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content, category_id } = req.body;
  const { error: validationError } = Post.validatePost;
  ({ title, content, category_id }, true);

  if (validationError) {
    res.status(422).json({ error: validationError.details });
  } else {
    try {
      const post = await Post.findOnePost(id);
      if (!post) res.sendStatus(404);
      await Post.updatePost(id, req.body);
      res.send({ ...post, ...req.body });
    } catch (err) {
      console.error(err);
      res.status(500).send("something went wrong while updating a post");
    }
  }
});

postRouter.get("/", async (req, res) => {
  try {
    const results = await Post.findMany();
    res.send(results);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

postRouter.get("/:id", async (req, res) => {
  try {
    const post = await Post.findOnePost(req.params.id);
    if (!post) res.sendStatus(404);
    else res.send(post);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

postRouter.delete("/:id", async (req, res) => {
  const deleted = await Post.deletePost(req.params.id);
  if (!deleted) res.sendStatus(404);
  else res.sendStatus(204);
});

module.exports = postRouter;
