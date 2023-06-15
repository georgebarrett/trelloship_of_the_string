import React from 'react';
import './Comment.css';

const Comment = ({comment}) => {
  return (
    <div className='comments' data-cy='comment-container'>
      <p>{comment.username}</p>
      <article data-cy='comment' key={ comment._id}>{ comment.message}</article>
    </div>
  )
}

export default Comment;
