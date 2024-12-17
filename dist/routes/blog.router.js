"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_controller_1 = require("../controllers/blog.controller");
const multer_1 = require("../lib/multer");
const fileFilter_1 = require("../lib/fileFilter");
const blog_validator_1 = require("../validators/blog.validator");
const jwt_1 = require("../lib/jwt");
const router = (0, express_1.Router)();
router.get("/", blog_controller_1.getBlogsController);
router.get("/:id", blog_controller_1.getBlogController);
// Harus berurutan:
router.post("/", jwt_1.verifyToken, (0, multer_1.uploader)().fields([{ name: "thumbnail", maxCount: 1 }]), fileFilter_1.fileFilter, blog_validator_1.validateCreateBlog, blog_controller_1.createBlogController);
router.delete("/:id", jwt_1.verifyToken, blog_controller_1.deleteBlogController);
exports.default = router;
