const connection = require("./db-config");
const express = require("express");
const app = express();
const cors = require("cors");

const { setupRoutes } = require("./routes/index");

const port = process.env.PORT || 3000;
connection.connect((err) => {
  if (err) {
    console.error("error connecting: " + err.stack);
  } else {
    console.log("connected as id " + connection.threadId);
  }
});

app.use(express.json());
app.use(cors());

setupRoutes(app);

// Rest of your code like routes

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
