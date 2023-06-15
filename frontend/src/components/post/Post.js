import React, { useState, useEffect } from 'react';
import { fetchComments, handleSendingNewComment, handleSendingNewLike } from '../../fetchers';
import Comment from '../comment/Comment';
import LikeButton from '../LikeButton/LikeButton';
import './Post.css';

const Post = ({post}) => {
  const [commentMessage, setCommentMessage] = useState('');
  const [comments, setComments] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [likeCount, setLikeCount] = useState(post.likedByUsers.length);
  
  // adds the comments in the comment feed on first render
  useEffect(() => {
    fetchComments(token, setToken, setComments, post._id)
  }, []);
  
  // calls the posts/add-like endpoint and updates like count
  const handleLike = async () => {
    const response = await handleSendingNewLike(token, post, '/posts/add-like');
    const responseData = await response.json();
    setLikeCount(responseData.likeCount);
  }

  // submits a comment on clicking submit button
  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    await handleSendingNewComment(token, post, commentMessage, '/posts/add-comment');
    // re-renders the comment feed with the new comment
    await fetchComments(token, setToken, setComments, post._id)
    // sets the input field back to empty string
    setCommentMessage("");
  }

  return(
    <>
      <h2 className='user-name'>{ post.username }</h2>
      <article className='post' data-cy="post" key={post._id}>
        <div className='post-container'>
          {post.message}
          <div className='like-button-container'>
            <LikeButton className='like-button' onLike={handleLike} /> {likeCount}
          </div>
        </div>
      </article>

      <div className='comment-display' id='comment-feed' role="feed">
       <h3 className='comments-title'>Comments</h3>
       {comments.map(
          (comment, index) => ( <Comment comment={ comment } key={ comment._id + index}/>)
       )}
      </div>
    
      <form className='comment-container' onSubmit={handleCommentSubmit}>
        <textarea
          className='comment-box'
          data-cy="comment-input-field"
          value={commentMessage}
          onChange={(event) => setCommentMessage(event.target.value)}
          type="text"
          placeholder='What do you think?'
          required>  
        </textarea>
        <button className='comment-button' data-cy="submit-comment">Submit</button>
      </form>

      
    </>
  )
}

export default Post;
