import React from 'react'
import { NavLink,Link } from 'react-router-dom'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'
import 'boxicons'
import { useSelector , useDispatch  } from 'react-redux'
import { logoutUser } from '../Features/authAction.js'

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {success,error,userInfo,useToken} = useSelector((state) => state.auth)
  const handleLogout = async () => {
    //either way i have to clear the data and token
    try {
      const { email } = userInfo;
      if(!email){
        navigate('/login')
      }
      await dispatch(logoutUser({ email }));
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      
    }
  }
  return (
    <div id="navbar-main">
    <nav>
      <input type="checkbox" id="check"/>
      <label htmlFor="check" className="checkbtn">
      <box-icon name='menu' id="menu-icon"></box-icon>
      </label>
      <label className="logo">TODO</label>
      <ul>
        <li><NavLink id="a" className="active" to="#">Home</NavLink></li>
        <li><NavLink id="a" >About</NavLink></li>
        <li><NavLink id="a" to="#">Serv</NavLink></li>
        <li><NavLink id="a" to="#">Contact</NavLink></li>
        <li><NavLink id="a" to="#">Feedback</NavLink></li>
        <li><button id='logout' onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
    <section></section>
    </div>
  )
}

export default Navbar