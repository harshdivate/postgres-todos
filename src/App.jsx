import { useState} from "react";
import axios from "axios";
// if cookies are expired so that means they will not be present in request , so in backend i should verify jwt 
// if the accesstoken is expired send an 401 request to the frontend ,
//  in the frontend if 401 is received the send a request to new endpoint to get new access and refresth token

function App() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [isLogin ,setisLogin] = useState(false);

  const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:4500',
    headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json',"Access-Control-Allow-Credentials":true},
    credentials: 'true',
  })
  const handleSubmit = async (e)=> {
      e.preventDefault();
    // const response =  await axios.post('http://localhost:4500/api/v1/users/login',{"email":"harsh@gmail.com","password":"1234"})
    
   try {
    const getD = await instance.post(
      '/api/v1/users/login', 
      {"email":"harsh@gmail.com","password":"1234"}
    ).then(res => res.data)
    // const strToken = getD.data[0].accesstoken;
    const decodeinfo = await jwtDecode(getD.data[0].refreshtoken);
    // console.log(getD.data[0].accesstoken)
    console.log(getD);
   } catch (error) {

    
   }
  }

  const handleClick = async () => {
    const data = await instance.post(
      '/api/v1/users/details',
      {"test":"test"}
    ).then(res => res.data)
    console.log(data);
  }

  return (
    <>
      <form>
        <div>
          <label>email</label>
          <input type="text"
          onChange={(e)=>setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label>password</label>
          <input type="text"
          onChange={(e)=>setPassword(e.target.value)}
          ></input>

        </div>
        <button type="submit"
        onClick={handleSubmit}
        >Login</button>
        
      </form>
      <button onClick={handleClick}>click</button> 
    </>
  )
}

export default App;
