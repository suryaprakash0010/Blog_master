import React, { useState } from 'react'
import axios from 'axios';

import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast';
 import { useNavigate } from 'react-router-dom';

const Login=()=> {

  const {axios, setToken} = useAppContext();
  const navigate = useNavigate();

 const [email,setEmail]=useState('')
 const [password, setPassword]=useState('')



   const handleSubmit = async (e) => {
   
  e.preventDefault();
  console.log("Login button clicked");

  try {
    const { data } = await axios.post('http://localhost:3000/api/admin/login', { email, password });

    if (data.success) {
      toast.success("Login successful!");
      setToken(data.token);
      localStorage.setItem('token', data.token);
      axios.defaults.headers.common['Authorization'] = data.token;
      navigate('/admin');
    } 
  } catch (error) {
        toast.error(error?.response?.data?.message || error.message || "Something went wrong");

    

  }
};


  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg'>
        <div className='flex flex-col items-center justify-center'>
          <div className='w-full py-6 text-center'>
            <h1 className='text-3xl font-bold'><span className='text-primary'>Admin</span> Login</h1>
            <p className='font-light'>Enter your credentials to access the admin panel </p>
          </div>
          <form onSubmit={handleSubmit} className='mt-6 w-full sm:max-w-md text-gray-600'>

            <div className='flex flex-col'>
              <label > Email </label>
              <input onChange={e=>setEmail(e.target.value)} value={email}
               type="email" required placeholder='Enter your email id' className='border-b-2 border-gray-300 p-2 outline-none mb-6'  />
            </div>


                  <div className='flex flex-col'>
              <label > Password </label>
              <input onChange={e=>setPassword(e.target.value)} value={password}
              type="password" required placeholder='Enter your Password' className='border-b-2 border-gray-300 p-2 outline-none mb-6'  />
            </div>

            <button type='submit' className='w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all'> Login </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login