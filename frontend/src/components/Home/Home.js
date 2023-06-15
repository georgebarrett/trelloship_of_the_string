import React from 'react';
import './Home.css'
import '../user/SignUpForm.css'

const Home = ({ navigate }) => {

  const signUpNav = () => {
    navigate('/signup')
  }

  const logInNav = () => {
    navigate('/login')
  }

  return(
    <>
    <div className='homepage'>
        
        <div className='titles'>
          <h1>Welcome to The Shire!</h1><br/>
        </div>
      
        <div className='buttons'>
          <button className='homeInputButton' onClick={logInNav}>
            Log-In
          </button>
          <button className='homeInputButton' onClick={signUpNav}>
            Sign-Up
          </button>
        </div>
    </div>
    </>
  );
}

export default Home;