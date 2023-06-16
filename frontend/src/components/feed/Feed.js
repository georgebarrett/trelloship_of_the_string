import './Feed.css'

import React, { useEffect, useState } from 'react';
import Post from '../post/Post';
import { fetchPosts, fetchUser, handleSendingNewPost } from '../../fetchers';
import Navbar from '../navbar/Navbar';

const Feed = ({ navigate, token, setToken, user, setUser }) => {
  const [message, setMessage] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts(token, setToken, setPosts);
    fetchUser(token, setToken, setUser)
  }, [])
    
  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleSendingNewPost(token, message, "/posts").then(() => {
      fetchPosts(token, setToken, setPosts)
    }
    )
    setMessage('');
  }

    if(token) {
      return(
        <>
          <Navbar />
        <div className="feedContainer">
            <h1>Enter the Trelloship</h1>
            <form className="postForm" onSubmit={handleSubmit}>
              <textarea 
                id='message'
                value={message}
                onChange={(event) => setMessage(event.target.value)} 
                type='text' 
                placeholder='Your precious feelings matter.' 
                required>
              </textarea>
              <button className='submit-button' id='submit'>Post</button>
            </form>

            <div id='feed' role="feed">
              {posts.map(
                // index is counting the times i map
                (post, index) => ( <Post post={ post } key={ post._id + index } /> )
              ).reverse()}
            </div>
            
            <button onClick={logout}>
              Logout
            </button>
            
            <p>{user.users[0].name}</p>
            <p>{user.users[0].username}</p>
            <p>{user.users[0].email}</p>
            <p>{user.users[0].password}</p>
        </div>
      </>
    )
    } else {
      navigate('/login')
    }
}

export default Feed;
