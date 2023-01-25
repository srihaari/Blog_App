const express = require("express");

const morgan = require("morgan");

const mongoose = require("mongoose");

const blogRoutes = require("./routes/blogRoutes");

const app = express();

const dbURI =
  "mongodb+srv://office_pc:4gyceGp77cYNikIB@nodetuts.zkmss1o.mongodb.net/node-tuts?retryWrites=true&w=majority";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(3000))
  .catch((err) => console.log(err));

mongoose.connection.on("connected", function () {
  console.info("MongoDB connected!");
});
mongoose.connection.on("open", function () {
  console.info("MongoDB connection opened!");
});
mongoose.connection.on("error", function (err) {
  console.info(err);
});

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.use("/blogs", blogRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
