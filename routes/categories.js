const express = require("express");
const Category = require("../models/category");

const categoriesRouter = express.Router();

categoriesRouter.post("/", async (req, res) => {
  const { title } = req.body;
  const { error: validationError } = Category.validateCategory({ title });

  if (validationError) {
    res.status(422).json({ errors: validationError.details });
  } else {
    try {
      const id = await Category.createCategory({ title });
      res.send({ id, title });
    } catch (err) {
      console.error(err);
      res.status(500).send("Cannot create that category");
    }
  }
});

categoriesRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const { error: validationError } = Category.validateCategory({ title }, true);

  if (validationError) {
    res.status(422).json({ errors: validationError.details });
  } else {
    try {
      const category = await Category.findOne(id);
      if (!category) res.sendStatus(404);
      await Category.updateCategory(id, req.body);
      res.send({ ...category, ...req.body });
    } catch (err) {
      console.error(err);
      res.status(500).send("Something went wrong while updating");
    }
  }
});

categoriesRouter.get("/", async (req, res) => {
  try {
    const results = await Category.findMany();
    res.send(results);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

categoriesRouter.get("/:id", async (req, res) => {
  try {
    const category = await Category.findOne(req.params.id);
    if (!category) res.sendStatus(404);
    else res.send(category);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

categoriesRouter.delete("/:id", async (req, res) => {
  const deleted = await Category.deleteCategory(req.params.id);
  if (!deleted) res.sendStatus(404);
  else res.sendStatus(204);
});

module.exports = categoriesRouter;
