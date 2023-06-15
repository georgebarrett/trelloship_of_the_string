const Post = require("../models/post");
const User = require("../models/user");
const multer = require('multer');
// const { uuid } = require('uuidv4');
const TokenGenerator = require("../models/token_generator");

const PostsController = {
  Index: (req, res) => {
    Post.find(async (err, posts) => {
      if (err) {
        throw err;
      }
      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({ posts: posts, token: token });
    });
  },

  Create: (req, res) => {
    User.findById(req.user_id).then((user) => {
      const requestObj = {
        username: user.username,
        message: req.body.message,
        photo: req.files.photo[0].path
      }
      const post = new Post(requestObj);
      post.save(async (err) => {
        if (err) {
          console.log(err)
          throw err;
        }
        const token = await TokenGenerator.jsonwebtoken(req.user_id)
        res.status(201).json({ message: 'OK', token: token });
      });
    });
  },

  addCommentToPost: (req, res) => {
    // creates a new comment from the request body
    const comment = req.body.comment;
    // finds the post in the DB using the post's Id
    Post.findById(req.body.postId).then((post)=> {
      // adds comment to the post
      post.comments.push(comment);
      // updates the post in the DB
      post.save(async (err) => {
        if(err) {
          throw err;
        }

        // generates a new tokem
        const token = await TokenGenerator.jsonwebtoken(req.user_id)
        // returns 202 OK with new token attached
        res.status(202).json({ message: 'OK', token: token });
      });
    });

  },
  AddLike: (req, res) => {
    Post.findById(req.body.postId)
    .then((post) => {
      post.likeCount ++
    post.save(async (err) => {
      if (err) {
        throw err;
      }

      const token = await TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({ message: 'OK', token: token });
    });
  }); 
  },

  // addImage: (req, res) => {
  //   const postId = req.params.postId;

  //   (async () => {
  //     try {
  //       const post = await Post.findById(postId);
  //       if (!post) {
  //         return res.status(404).json({ error: 'Post not found' });
  //       }

  //       if (req.file) {
  //         post.photo = req.file.filename;
  //       }

  //       const updatedPost = await post.save();
  //       res.status(200).json(updatedPost);
  //     } catch (error) {
  //       console.error(error);
  //       res.status(500).json({ error: 'Internal server error' });
  //     }
  //   })();
  // }
};

module.exports = PostsController;
