const Joi = require("joi");
const connection = require("../db-config");

module.exports.validatePost = (post, forUpdate = false) => {
  return Joi.object({
    title: Joi.string()
      .max(255)
      .presence(forUpdate ? "optional" : "required"),
    content: Joi.string()
      .max(65000)
      .presence(forUpdate ? "optional" : "required"),
    category_id: Joi.number().required(),
  }).validate(post, { abortEarly: false });
};

module.exports.createPost = ({ title, content, category_id }) => {
  return connection
    .promise()
    .query("INSERT INTO post (title, content, category_id ) VALUES (?,?,?)", [
      title,
      content,
      category_id,
    ])
    .then(([res]) => res.insertID);
};

module.exports.findMany = () => {
  return connection
    .promise()
    .query("SELECT * FROM post")
    .then(([res]) => res);
};

module.exports.findOnePost = (id) => {
  return connection
    .promise()
    .query("SELECT * FROM post WHERE id=?", [id])
    .then(([res]) => res);
};

module.exports.updatePost = (id, newAttributes) => {
  return connection
    .promise()
    .query("UPDATE post SET ? WHERE id = ?", [{ ...newAttributes }, id]);
};

module.exports.deletePost = (id) => {
  return connection
    .promise()
    .query("DELETE FROM post WHERE id = ?", [id])
    .then(([res]) => !!res.affectedRows);
};
