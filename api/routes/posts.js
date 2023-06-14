const express = require("express");
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

const PostsController = require("../controllers/posts");

router.get("/", PostsController.Index);
router.post("/", PostsController.Create);
router.post("/add-comment", PostsController.addCommentToPost);
router.post("/add-like", PostsController.AddLike);
// router.post("/add-image", PostsController.AddImage);


// addComment controller invoked in here
const DIR = '../public/';

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, DIR);
    },
    filename: (req, file, callback) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        callback(null, uuidv4() + '-' + fileName)
    }
});
var upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            callback(null, true);
        } else {
            callback(null, false);
            return callback(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});


module.exports = router;
