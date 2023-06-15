const express = require("express");
const router = express.Router();
const multer = require('multer');
const mongoose = require('mongoose');
const { uuid } = require('uuidv4');
const DIR = './public';


// addComment controller invoked in here
const PostsController = require("../controllers/posts");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, DIR);
    },
    filename: (req, file, callback) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        callback(null, uuid() + '-' + fileName)
    }
});

const upload = multer({
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

router.get("/", PostsController.Index);
router.post("/", upload.fields([{ name: 'message', maxCount: 1 }, { name: 'photo', maxCount: 8 }]), PostsController.Create);
router.post("/add-comment", PostsController.addCommentToPost);
router.post("/add-like", PostsController.AddLike);

module.exports = router;
