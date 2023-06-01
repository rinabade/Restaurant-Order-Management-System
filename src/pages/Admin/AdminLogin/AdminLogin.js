import React from 'react'
import './AdminLogin.css'
import { Link,useNavigate  } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

function AdminLogin() {
        const navigate = useNavigate();
          const[values, setValues]= useState({
              email:'',
              password:''
          })
          const handleSubmit = (event) => {
              event.preventDefault();
              axios.post('',values)
              .then(res => {
                  if (res.data.Status === "Success") {
                    navigate("/admin/Dashboard");
                  }
                  else{
                    alert("Error")
                  }
                })
                .then(err => console.log(err));
          }
  return (
    <div className='login d-flex justify-content-center align-items-center vh-100'>
        <div className='glass p-3 rounded w-45'>
            <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
            <div className='mb-3'>
            <label htmlFor="email"><strong>Email</strong></label>
                <input type="email" placeholder='Enter Email' name='name'
                 onChange={e => setValues({...values,email: e.target.value})} className="form-control rounded-0" required/>
            </div>
            <div className='mb-3'>
            <label htmlFor="password"><strong>Password</strong></label>
                <input type="password" placeholder='Enter Password' name='name'
                 onChange={e => setValues({...values,password: e.target.value})} className="form-control rounded-0" required/>
            </div>
           <button type='submit' className='btn btn3 w-100 rounded-12 mb-3'>Log in</button>
          
          {/* <p>New user?&nbsp;<Link to="/admin/Register" className='text-primary'>Create Account</Link></p>  */}
        </form>
        </div>
      
    </div>
  )
}

export default AdminLogin
