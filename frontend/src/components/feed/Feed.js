import './Feed.css'

import React, { useEffect, useState } from 'react';
import Post from '../post/Post';
import { fetchPosts, handleSendingNewPost } from '../../fetchers';
import axios from "axios";


const Feed = ({ navigate }) => {
  const [message, setMessage] = useState('');
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [newUser, setNewAuthor] = useState({photo: ""});

  useEffect(() => {
    fetchPosts(token, setToken, setPosts);
  }, [])
    
  const handlePhoto = (event) => {
    setNewAuthor({ ...newUser, photo: event.target.files[0] });
    console.log(newUser.photo);
  };

  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData()
    formData.append('photo', newUser.photo)

    axios.post('http://localhost:3000/users/add', formData)
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.log(error)
      });
      
    handleSendingNewPost(token, message, "/posts").then(() => {
      fetchPosts(token, setToken, setPosts)
    }
    )
    setMessage('');
  }

    if(token) {
      return(
        <div class="feedContainer">
            <h1>Enter the Trelloship</h1>
            <form class="postForm" onSubmit={handleSubmit} encType="multiPart/form-data">
              <textarea 
                id='message'
                value={message}
                onChange={(event) => setMessage(event.target.value)} 
                type='text' 
                placeholder='Your precious feelings matter.' 
                required>
              </textarea>
              <input
              type="file"
              accept=".png, .jpg, .jpeg"
              name="photo"
              onChange={handlePhoto}
              />
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
        </div>
      )
    } else {
      navigate('/signin')
    }
  }

export default Feed;