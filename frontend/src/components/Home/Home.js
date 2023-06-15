import React, { useEffect, useRef } from 'react';
import './Home.css';
import '../user/SignUpForm.css';

const Home = ({ navigate }) => {
  const audioRef = useRef(null);

  const handleButtonClick = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  useEffect(() => {
    const container = document.getElementById('background-music');
    const audio = document.createElement('audio');
    audio.src = process.env.PUBLIC_URL + '/audio/Homepage.mp3';
    audioRef.current = audio;
    container.appendChild(audio);

    return () => {
      container.removeChild(audio);
    };
  }, []);

  const signUpNav = () => {
    navigate('/signup');
  };

  const logInNav = () => {
    navigate('/login');
  };

  return (
    <>
      <div className='homepage'>
        <div id='background-music' />
        <div className='titles'>
          <h1>Welcome to The Shire!</h1>
        </div>

        <div className='buttons'>
          <button className='inputButton' onClick={logInNav}>
            Log-In
          </button>
          <button className='inputButton' onClick={signUpNav}>
            Sign-Up
          </button>
          <button className='inputButton' onClick={handleButtonClick}>
            Ambience button
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
