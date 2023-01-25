const express = require("express");

const blogcontroller = require("../controllers/blogController");

const router = express.Router();

router.get("/", blogcontroller.blog_index);

router.post("/", blogcontroller.blog_create_post);

router.get("/create", blogcontroller.blog_create_get);

router.get("/:id", blogcontroller.blog_details);

router.delete("/:id", blogcontroller.blog_delete);

module.exports = router;
