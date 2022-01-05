const Joi = require("joi");
const connection = require("../db-config");

module.exports.validateCategory = (title, forUpdate = false) => {
  return Joi.object({
    title: Joi.string()
      .max(255)
      .presence(forUpdate ? "optional" : "required"),
  }).validate(title, { abordEarly: false });
};

module.exports.createCategory = ({ title }) => {
  return connection
    .promise()
    .query("INSERT INTO category (title) VALUES (?)", [title])
    .then(([res]) => res.insertId);
};

module.exports.findMany = () => {
  return connection
    .promise()
    .query("SELECT * FROM category")
    .then(([res]) => res);
};

module.exports.findOne = (id) => {
  return connection
    .promise()
    .query("SELECT * FROM category WHERE id = ?", [id])
    .then(([res]) => res);
};

module.exports.updateCategory = (id, newAttributes) => {
  return connection
    .promise()
    .query("UPDATE category SET ? WHERE id = ?", [{ ...newAttributes }, id]);
};

module.exports.deleteCategory = (id) => {
  return connection
    .promise()
    .query("DELETE FROM category WHERE id = ?", [id])
    .then(([res]) => !!res.affectedRows);
};
