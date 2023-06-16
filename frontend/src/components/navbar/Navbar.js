import React from 'react';
import './Navbar.css';

const Navbar = ({ navigate }) => {

  const logout = () => {
    window.localStorage.removeItem("token")
    navigate('/login')
  }

  return (
    <div className='navbar-container'>
        {/* lotr related stuff */}
        <div>
           <h1 className='header'>The Trelloship of the String</h1>
        </div>

        <ul className="links-container"> 
            <button className="logoutbutton" onClick={logout}>
              Logout
            </button>
        </ul>
    </div>
  )
}

export default Navbar