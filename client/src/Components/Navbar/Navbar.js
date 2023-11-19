import React, { useEffect, useState } from 'react'
import "./Navbar.css";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

  const [logged, setLogged] = useState(localStorage.getItem("logged"));
  const navigate = useNavigate();

  //To check whether a User is Logged or not
  useEffect(() => {
    window.addEventListener("storage", () => {
      setLogged(localStorage.getItem("logged"));
    })
  }, [])

  //Logout Functionality
  const handleClick = () => {
    localStorage.clear();
    window.dispatchEvent(new Event("storage"));
    navigate("/login");
  }

  return (
    <header>
        <nav>
            <h1><a href='/'>ChatBot</a></h1>
            <div className='nav-buttons'>
              {
                logged ? (
                  <>
                    <h1>{JSON.parse(localStorage.getItem("User")).username}</h1>
                    <button type='button' className='navButton' onClick={handleClick}>Logout</button>
                  </>
                ) : (
                  <>
                    <a href='/login' className='navButton'>Login</a>
                    <a href='/register' className='navButton'>Register</a>
                  </>
                )
              }
            </div>
        </nav>
    </header>
  )
}

export default Navbar;