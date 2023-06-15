import './Feed.css'

import React, { useEffect, useState } from 'react';
import Post from '../post/Post';
import { fetchPosts, handleSendingNewPost } from '../../fetchers';

const Feed = ({ navigate }) => {
  const [message, setMessage] = useState('');
  const [posts, setPosts] = useState([]);
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [newImage, setNewImage] = useState({});

  useEffect(() => {
    fetchPosts(token, setToken, setPosts);
  }, [])
    
  const handlePhoto = (event) => {
    setNewImage({ photo: event.target.files[0] });
  };

  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData()
    console.log(newImage.photo)
    formData.append('photo', newImage.photo)
    formData.append('message', message)
    console.log(formData)
    fetch('http://localhost:3000/posts', {
      method: 'post',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
        
    })
      .then(res => {
        handleSendingNewPost(token, message, "/posts").then(() => {
          fetchPosts(token, setToken, setPosts)
        })
      })
      .catch(error => {
        console.log(error)
      });
      
    
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