import React from 'react';
import { AiOutlineLike } from 'react-icons/ai'

const LikeButton = ({ onLike }) => {
  return <AiOutlineLike id="submit-like" data-cy="likeButton" onClick={onLike} />
};

export default LikeButton;
