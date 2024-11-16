const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const postRoutes = require("./routes/postRoutes");

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

connectDB();
app.use("/", postRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use("/", postRoutes);
app.get("/", (req, res) => {
  res.redirect("/home");
});

app.use(express.static("images"));

