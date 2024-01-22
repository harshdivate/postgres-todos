import React, { useEffect, useState } from 'react'
import Navbar from './Navbar/Navbar.jsx'
import './Home.css'
import { jwtDecode } from 'jwt-decode'
import LoginForm from './LoginForm/LoginForm.jsx'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CookiesProvider , useCookies ,Cookies} from 'react-cookie'
import { setUser } from './Features/authSlice.js'

function Home() {
  const navigate = useNavigate();
  const {success,userInfo , error ,userToken } = useSelector((state)=>state.auth)
  const dispatch = useDispatch();
  const [cookies , setCookie] = useCookies(['accessToken']);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [todoItems, setTodoItems] = useState(Array.from({ length: 20 }, (_, index) => ({ id: index, data: {} })));

  const userData = {
    name : 'harsh',
    village: 'hubli',
    house : '40 house'
  }


  useEffect(()=>{
  // here when the application reloads the success state of RTK will always be false
  // so whenever the user opens this application i should redirect him to login page and clear cookies
  const accessToken = cookies.accessToken;
  if(accessToken){
    dispatch(setUser(accessToken))
    // here i should make an api call to load all the todos of the particular user.
  }else{
    navigate('/login')
  }
  setTimeout(()=>{
      setDataLoaded((prev)=> !prev)
  },5000)
  },[])
  
  return (
     <div className='home-container'>
       <Navbar/>
            {/* Grid system  */}
            <div className='grid-container'>
              {/* Individual Todo */}
             

              {todoItems.map(e => 
                (
                  <div  key= {e.id} className='todo-main'>
                  <div className={` ${dataLoaded ? 'todo-heading' : 'skeleton skeleton-heading'}`}>
                     {dataLoaded && userData.village}
                  </div>
                  <div className='todo-description '>
                    {dataLoaded && userData.name}
                    <div className={` ${dataLoaded ? '' : 'skeleton skeleton-text'}`}></div>
                    <div className={`${dataLoaded ? '' : 'skeleton skeleton-text'}`}></div>
                    <div className={`${dataLoaded ? '' : 'skeleton skeleton-text'}`}></div>
                  </div>
                  <div className={`todo-date ${dataLoaded ? '' : 'skeleton skeleton-date'}`}>{dataLoaded && Date.now()}</div>

                  <div className='todo-footer'>
                    <div className={`todo-status ${dataLoaded ? '' : 'skeleton skeleton-status'}`}>{dataLoaded && 'true'}</div>
                    <div className='todo-options'>
                    <div className={` ${dataLoaded ? '' : 'skeleton skeleton-options'}`}>{dataLoaded && 'F'}</div> 
                    <div className={`${dataLoaded ? '' : 'skeleton skeleton-options'}`}>{dataLoaded && 'D'}</div>
                    <div className={` ${dataLoaded ? '' : 'skeleton skeleton-options'}`}>{dataLoaded && 'M'}</div>
                    </div>
                  </div>
              </div>
                )
              )}

            
           
            
            </div>
       
   </div>

  )
}

export default Home

// how to load the data 
// my plan is to take an dummy array of 20 and loop and display skeleton
// after fetching the data from my backend i will replace the array which array of my result


