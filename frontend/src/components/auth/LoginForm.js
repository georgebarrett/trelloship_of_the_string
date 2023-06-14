import React, { useState } from 'react';
import './LoginForm.css'; 

const LogInForm = ({ navigate }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState({ email: '', password: ''})


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateEmail() && validatePassword()) {
      let response = await fetch('/tokens', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
      });

      if (response.status !== 201) {
        setValidationError({ password: 'Username and password do not match' });
        console.log(validationError)
      } else {
        let data = await response.json();
        window.localStorage.setItem('token', data.token);
        navigate('/posts')
      }
    }
  }

  const validateEmail = () => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const validEmail = regex.test(email);

    if (validEmail) {
      setValidationError({ email: '', password: '' });
      return true
    } else {
      setValidationError(previousState => ({ ...previousState, email: 'Please enter a valid email address.' }));
      return false
    }
  };

  const validatePassword = () => {
    if (password.length > 0) {
      setValidationError({email: '', password: ''});
      return true;
    } else {
      setValidationError(previousState => ({ ...previousState, password: 'Please enter a valid password.' }));
      return false
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  };

    return (
      <div className="loginContainer">
        <h1 className="loginHeading">Return to Rivendell...</h1>
        <form className="loginForm" onSubmit={handleSubmit}> 
          <input className="loginInput" placeholder='Email' id="email" type='text' value={ email } onChange={handleEmailChange} />
          <p className='validation-error'>{validationError?.email}</p>
          <input className="loginInput" placeholder='Password' id="password" type='password' value={ password } onChange={handlePasswordChange} />
          <p className='validation-error'>{validationError?.password}</p>
          <input className="loginButton" role='submit-button' id='submit' type="submit" value="Submit" />
        </form>
      </div>
    );
}

export default LogInForm;
