import React, { useEffect, useState } from 'react'
import Navbar from './Navbar/Navbar.jsx'
import './Home.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CookiesProvider , useCookies ,Cookies} from 'react-cookie'
import { setInitialState } from './Features/authSlice.js'
import useTodoDummy from './useDummyTodos.js'

function Home() {
  const navigate = useNavigate();
  const {success,userInfo , error ,userToken } = useSelector((state)=>state.auth)
  const dispatch = useDispatch();
  const [cookies , setCookie] = useCookies(['accessToken']);
  const [dataLoaded, setDataLoaded] = useState(false);

  const [todoItems, setTodoItems] = useState(Array.from({ length: 20 }, (_, index) => ({ id: index, data: {} })));



  useEffect(()=>{
  const accessToken = cookies.accessToken;
    if(!accessToken){
      dispatch(setInitialState())
      navigate('/login')
    }
 
  setTimeout(()=>{
      const data = useTodoDummy();
      setTodoItems(data);
      setDataLoaded((prev)=> !prev)
  },5000)
  },[success])
  
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
                     {dataLoaded && e.todoHeading}
                  </div>
                  <div className='todo-description '>
                    {dataLoaded && e.todoDescription}
                    <div className={` ${dataLoaded ? '' : 'skeleton skeleton-text'}`}></div>
                    <div className={`${dataLoaded ? '' : 'skeleton skeleton-text'}`}></div>
                    <div className={`${dataLoaded ? '' : 'skeleton skeleton-text'}`}></div>
                  </div>
                  <div className={`todo-date ${dataLoaded ? '' : 'skeleton skeleton-date'}`}>{dataLoaded && e.date}</div>

                  <div className='todo-footer'>
                    <div className={`todo-status ${dataLoaded ? '' : 'skeleton skeleton-status'}`}>{dataLoaded && e.status}</div>
                    <div className='todo-options'>
                    <div className={` ${dataLoaded ? '' : 'skeleton skeleton-options'}`}>{dataLoaded && e.isFavourite}</div> 
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


