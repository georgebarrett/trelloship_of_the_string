import React from 'react';
import './Comment.css';

const Comment = ({comment}) => {
  return (
    <div className='comments'>
      <article data-cy='comment' key={ comment._id}>{ comment.message}</article>
    </div>
  )
}
export default Comment;