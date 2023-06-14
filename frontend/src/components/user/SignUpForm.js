import React, { useState } from 'react';
import './SignUpForm.css';

const SignUpForm = ({ navigate }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [validationError, setValidationError] = useState({username: '', email: ''})

 
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateUsername() && validateEmail() && validatePassword()) {
      fetch('/users', {
        method: 'post',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password, username: username, name: name }),
      }).then(response => {
        if (response.status === 201) {
          navigate('/login');
        } else {
          response.json().then(data => {
            setValidationError({ password: data.message })
          })
        }
      })
    };
  }

  const validateEmail = () => {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const validEmail = regex.test(email)

    if (validEmail) {
      setValidationError(previousState => ({ ...previousState, email: '' }));
      return true;
    } else {
      setValidationError(previousState => ({ ...previousState, email: 'Please enter a valid email' }));
      return false;
    }
  }

  const validateUsername = () => {
    if (username.length > 0) {
      setValidationError(previousState => ({ ...previousState, username: '' }));
      return true;
    } else {
      setValidationError(previousState => ({ ...previousState, username: 'Your username must contain a character' }));
      return false;
    }
  }

  const validatePassword = () => {
    if (password.length >= 8) {
      setValidationError(prevState => ({ ...prevState, password: "" }));
      return true;
    } else {
      setValidationError(prevState => ({ ...prevState, password: "Please enter a password that is at least 8 characters" }));
      return false;
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }


    return (
      <div className="signUpContainer">
        <h1 className="signUpHeading"> Start your journey to Mordor.... </h1>
        <form className="signUpForm" onSubmit={handleSubmit}>
            <input className="formInput" placeholder='Name' id="name" type='text' value={ name } onChange={handleNameChange} />
            <input className= "formInput" placeholder="Username" id="username" type="text" value={ username } onChange={ handleUsernameChange } />
            <p className='validation-error'>{validationError?.username}</p>
            <input className= "formInput" placeholder="Email" id="email" type='text' value={ email } onChange={handleEmailChange} />
            <p className='validation-error'>{validationError?.email}</p>
            <input className= "formInput" placeholder="Password" id="password" type='password' value={ password } onChange={handlePasswordChange} />
            <p className='validation-error'>{validationError?.password}</p>
          <input  className= "inputButton" id='submit' type="submit" value="Submit" />
        </form>
      </div>
    );
}

export default SignUpForm;
