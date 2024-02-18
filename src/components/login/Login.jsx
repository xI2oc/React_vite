import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import React, { useState } from 'react'

const Login = () => {
  //state
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const clickloginApp = async () => {
    try {
      const url = "https://workshop-react-api.vercel.app/login"
      //ใช้ได้
      const res = await axios.post(url, { username, password })

      const decode = jwtDecode(res.data.token)

      console.log(res.data.token);
      localStorage.setItem('token',res.data.token) 
      localStorage.setItem('user_id',decode.user_id)
      // localStorage.setItem('iat',decode.iat)
      // localStorage.setItem('exp',decode.exp)

      setTimeout(() => {
        window.location.reload()
      }, 1500);
    } catch (error) {
      //error
      console.log(error);
    }
  }
  return (
    <div className=' bg-slate-100 h-screen flex justify-center items-center'>
      <div className=' bg-white rounded-lg shadow-lg px-52 py-40'>
        <h2 className=' text-3xl mb-10'>เข้าสู่ระบบ</h2>
        
        username : {username}<br />
        password : {password} <br />

        <div className=' flex flex-col '>
          <div className=' text-gray-500'>
            Username
          </div>
          <input  
            onChange={(e) => setUsername(e.target.value)}
            placeholder='username'
            type="text"
            className=' border border-gray-400 rounded-lg p-2'
          />
          <div className='mt-3  text-gray-500'>
            Password
          </div>
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder='password'
            type="password"
            className=' border border-gray-400 rounded-lg p-2'
          />

          <button onClick={clickloginApp} className=' bg-blue-500 rounded-lg mt-8 py-1.5 text-white'>เข้าสู่ระบบ</button>

        </div>

      </div>
    </div>
  )
}

export default Login
