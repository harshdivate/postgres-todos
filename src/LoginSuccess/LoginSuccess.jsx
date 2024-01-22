import React, { useState } from 'react'
import axios from 'axios';
import {Cookies , useCookies} from 'react-cookie'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const instance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:4500",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true,
  },
  credentials: "true",
});

function LoginSuccess() {
    const navigate = useNavigate();
    const [cookies , setCookie] = useCookies(['accessToken']);
    const [userDetails,setUserDetails] = useState('')
    const {userInfo,success} = useSelector((state)=>state.auth)

    const handleClick = async  () => {
     try {
       const {status ,data}= await instance.post('/api/v1/users/details')
       if(status === 200){
         setUserDetails(data)
         console.log('User details from state is' + userInfo);
        

       }else{
         navigate('/login')
       }
       
     } catch (error) {
        navigate('/login')
     }
    }
    
  return (
    <div>
      <button onClick={handleClick}>GET USER DETAILS</button>
      <div>{userDetails.toString()}</div>
    </div>
    
  )
}

export default LoginSuccess