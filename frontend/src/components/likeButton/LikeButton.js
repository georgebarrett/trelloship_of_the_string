import React from 'react';
import { handleSendingNewLike } from '../../fetchers';
import { AiOutlineLike } from 'react-icons/ai'

const LikeButton = ({token, post, setLikeCount}) => {
  const handleLike = async () => {
    const response = await handleSendingNewLike(token, post, '/posts/add-like');
    const responseData = await response.json();
    setLikeCount(responseData.likeCount);
  }

  return <AiOutlineLike id="submit-like" data-cy="likeButton" onClick={handleLike} />
};

export default LikeButton;
