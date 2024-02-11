import React,{useState} from 'react'
import './AddTodoForm.css'
import { useDispatch,useSelector } from 'react-redux';
import { postTodo } from '../../Features/todoAction';

function AddTodoForm(props) {

  const [date,setDate] = useState(new Date());
  const [description,setDescription] = useState('');
  const [title,setTitle] = useState();
  

  const handleCancel = () => {
    props.setTrigger(false);
  }

  const submitForm = async(e) => {
    e.preventDefault();
    // send request to backend
    const result = await postTodo({title,description,date,userId:'3'})
    console.log(result)
      props.setTrigger(false);
  }

  return (props.trigger) ? (
    
    <div>
         <div className="blur-background"></div>
         <div>
         <div class="formbold-main-wrapper">
  <div class="formbold-form-wrapper">
    <form  className='todo-form'>
        <div class="formbold-input-flex">
          <div>
              <input
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Add title"
              class="formbold-form-input"
              onChange={(e)=>setTitle(e.target.value)}
              />
              <label for="firstname" class="formbold-form-label"> Title </label>
          </div>
          
        </div>

        <div className='formbold-input-flex'>
            <div>
                <input
                type="date"
                name="lastname"
                id="lastname"
                class="formbold-form-input"
                value={date.toISOString().split('T')[0]}
                onChange={(e)=> setDate(new Date(e.target.value))}
                />
                <label for="lastname" class="formbold-form-label"> Date </label>
            </div>
        </div>

        

        <div class="formbold-textarea">
            <textarea
                rows="6"
                name="message"
                id="message"
                placeholder="Write your message..."
                class="formbold-form-input"
                onChange={(e)=>setDescription(e.target.value)}
            ></textarea>
            <label for="message" class="formbold-form-label"> Description </label>
        </div>

       

        <button class="formbold-btn" type='submit' onClick={submitForm}>
            Send Message
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