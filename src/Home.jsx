import React, { useEffect, useState } from 'react'
import Navbar from './Navbar/Navbar.jsx'
import './Home.css'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CookiesProvider , useCookies ,Cookies} from 'react-cookie'
import { setInitialState } from './Features/authSlice.js'
import useTodoDummy from './useDummyTodos.js'
import AddTodoForm from './components/AddTodoFrom/AddTodoForm.jsx'
import { getTodosOfUser } from './Features/todoAction.js'

function Home() {
  const navigate = useNavigate();
  const {todos,todoLoading,todoSuccess} = useSelector((state) => state.todo)
  const {success,userInfo , error ,userToken } = useSelector((state)=>state.auth)
  const id = userInfo.id
  const dispatch = useDispatch();
  const [isTodosAvailable,setTodosAvailable] = useState(todoLoading)
  const [cookies , setCookie] = useCookies(['accessToken']);
  const [addTodoForm,setAddTodoForm] = useState(false);
  const [trigger, setTrigger] = useState(false);


  // const [todoItems, setTodoItems] = useState(Array.from({ length: 20 }, (_, index) => ({ id: index, data: {} })));
  // const [todoItems, setTodoItems] = useState(todos)

  const toggleTodoFrom = () => {
    setAddTodoForm((prev) => !prev)
  }
  console.log(todos)

  useEffect(()=>{
  const accessToken = cookies.accessToken;
    if(!accessToken){
      dispatch(setInitialState())
      navigate('/login')
    }
    // const getTodoOfUser = async (id) => {
    //   dispatch(getTodosOfUser(id))
    // }
    else {
    if (id) {
      const getTodoOfUser = async (id) => {
        dispatch(getTodosOfUser({id : id}));
      };
      
      getTodoOfUser(id); // Pass the user's ID to the function
    }
  }
    
    if(success){
      setTodosAvailable(true)
    }
  },[success,todoSuccess,isTodosAvailable])
  
  return (
     <div className='home-container'>
       <Navbar/>
            {/* Grid system  */}
            <div className="addTodoButton">
              <button onClick={(e)=>setTrigger(true)}>
                Add Todo 
                {/* https://stackoverflow.com/questions/58605846/how-to-show-a-form-in-the-same-window-on-onclick-event-of-a-button-in-react-js */}
              </button>
              <AddTodoForm trigger={trigger} setTrigger={setTrigger}/>
            </div>
            <div></div>
            <div className='grid-container'>
              {/* Individual Todo */}
              {todos.map(e => 
                (
                  <div  key= {e.id} className='todo-main'>
                  <div className={` ${isTodosAvailable ? 'todo-heading' : 'skeleton skeleton-heading'}`}>
                     {isTodosAvailable && e.title}
                  </div>
                  <div className='todo-description '>
                    {isTodosAvailable && e.description}
                    <div className={` ${isTodosAvailable ? '' : 'skeleton skeleton-text'}`}></div>
                    <div className={`${isTodosAvailable ? '' : 'skeleton skeleton-text'}`}></div>
                    <div className={`${isTodosAvailable ? '' : 'skeleton skeleton-text'}`}></div>
                  </div>
                  <div className={`todo-date ${isTodosAvailable ? '' : 'skeleton skeleton-date'}`}>{isTodosAvailable && JSON.stringify(e.date)}</div>

                  <div className='todo-footer'>
                    <div className={`todo-status ${isTodosAvailable ? '' : 'skeleton skeleton-status'}`}>{isTodosAvailable && e.status}</div>
                    <div className='todo-options'>
                    <div className={` ${isTodosAvailable ? '' : 'skeleton skeleton-options'}`}>{isTodosAvailable}</div> 
                    <div className={`${isTodosAvailable ? '' : 'skeleton skeleton-options'}`}>{isTodosAvailable && 'D'}</div>
                    <div className={` ${isTodosAvailable ? '' : 'skeleton skeleton-options'}`}>{isTodosAvailable && 'M'}</div>
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


