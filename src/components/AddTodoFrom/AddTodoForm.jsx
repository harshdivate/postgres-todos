import React,{useState} from 'react'
import './AddTodoForm.css'

function AddTodoForm(props) {

  const [date,setDate] = useState(new Date());
  const [description,setDescription] = useState('');
  const [task,setTask] = useState();

  const handleCancel = () => {
    props.trigger = false
  }

  const submitForm = (e) => {
    e.preventDefault();
    console.log('Task is '+task+'Descirpitong is' + description + 'Date is' +date)
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
              placeholder="Add Task"
              class="formbold-form-input"
              onChange={(e)=>setTask(e.target.value)}
              />
              <label for="firstname" class="formbold-form-label"> Task </label>
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