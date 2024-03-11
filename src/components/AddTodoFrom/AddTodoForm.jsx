import React,{useState} from 'react'
import './AddTodoForm.css'
import { useDispatch,useSelector } from 'react-redux';
import { addTodo } from '../../Features/todoAction.js';

function AddTodoForm(props) {
  const dispatch = useDispatch();
  const [date,setDate] = useState(new Date());
  const [description,setDescription] = useState('');
  const [title,setTitle] = useState();
  const  {userInfo} = useSelector(state => state.auth)
  

  const handleCancel = () => {
    props.setTrigger(false);
  }

  const submitForm = async(e) => {
    e.preventDefault();
    // send request to backend
    // const result = await postTodo({title,description,date,userId:'3'})

    dispatch(addTodo({title:title,description:description,date:date,userId: userInfo.id}))
    props.setTrigger(false);
  }

  return (props.trigger) ? (
    
    <div>
         <div className="blur-background"></div>
         <div>
         <div className="formbold-main-wrapper">
  <div className="formbold-form-wrapper">
    <form  className='todo-form'>
        <div className="formbold-input-flex">
          <div>
              <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Add title"
              className="formbold-form-input"
              onChange={(e)=>setTitle(e.target.value)}
              />
              <label htmlFor="firstname" className="formbold-form-label"> Title </label>
          </div>
          
        </div>

        <div className='formbold-input-flex'>
            <div>
                <input
                type="date"
                name="lastname"
                id="lastname"
                className="formbold-form-input"
                value={date.toISOString().split('T')[0]}
                onChange={(e)=> setDate(new Date(e.target.value))}
                />
                <label htmlFor="lastname" className="formbold-form-label"> Date </label>
            </div>
        </div>

        

        <div className="formbold-textarea">
            <textarea
                rows="6"
                name="message"
                id="message"
                placeholder="Write your message..."
                className="formbold-form-input"
                onChange={(e)=>setDescription(e.target.value)}
            ></textarea>
            <label htmlFor="message" className="formbold-form-label"> Description </label>
        </div>

       

        <button className="formbold-btn" type='submit' onClick={submitForm}>
            Add Todo
        </button>
        
        <button className='formbold-btn cancel' onClick={handleCancel}>Cancel</button>
    </form>
  </div>
</div>

         </div>
    </div>
  ) : ""
}

export default AddTodoForm