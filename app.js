const express = require("express");

const morgan = require("morgan");

const mongoose = require("mongoose");

const Blog = require("./models/blog");

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

app.set("view engine", "ejs");
app.use(morgan("dev"));

app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "new blog2",
    snippet: "about my second blog",
    body: "more about my second blog",
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

// app.use((req, res, next) => {
//   console.log("new request made");
//   console.log("host:", req.hostname);
//   console.log("path:", req.path);
//   console.log("method:", req.method);
//   next();
// });

// app.use((req, res, next) => {
//   console.log("in the next middleware");
//   next();
// });

app.get("/", (req, res) => {
  const blogs = [
    {
      title: "Yoshi finds eggs",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "Mario finds stars",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
    {
      title: "How to defeat bowser",
      snippet: "Lorem ipsum dolor sit amet consectetur",
    },
  ];
  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "ask" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
