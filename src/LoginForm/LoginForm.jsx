import React,{useEffect, useState} from 'react'
import {useForm} from "react-hook-form"
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../Features/authAction.js';
import axios from "axios";
import { NavLink, useNavigate } from 'react-router-dom';

// {"status":true,"message":"user logged in successfully",
// "data":[
    // {"username":"harsh",
    // "email":"harsh@gmail.com",
    // "accesstoken":".123",
    // "refreshtoken":"1123"}
// ]}

function LoginForm() {
    //usenavigate to redirect 
    const navigate = useNavigate();
    // redux actions
    const {success, userInfo , error , loading} = useSelector((state)=>state.auth)

    // hook-form configuration
    const {register , handleSubmit} = useForm();
    const dispatch = useDispatch();
 

    useEffect(()=>{
      if(success){
        console.log('Successfully logged in');
        navigate('/')
      }

    },[success,loading,error])
    
    const submitForm =  (data) => {
      console.log(data);
      dispatch(loginUser(data))

    }
  
    const handleClick = async () => {
      const data = await instance.post(
        '/api/v1/users/details',
        {"test":"test"}
      ).then(res => res.data)
      console.log(data);
    }
  return (
   <section className="bg-gray-50 dark:bg-gray-900 flex flex-col items-center justify-center w-full">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 w-full">
      <NavLink to="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/>
          Login    
      </NavLink>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" 
              onSubmit={handleSubmit(submitForm)}
              >
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input {...register("email")} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input {...register("password")} type="password" name="password" id="password" placeholder="" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                          </div>
                      </div>
                      <NavLink to="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</NavLink>
                  </div>
                  <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don’t have an account yet? <NavLink to="/" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</NavLink>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
  )
}

export default LoginForm