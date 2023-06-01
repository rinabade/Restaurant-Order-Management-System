import React from 'react'
import './AdminRegister.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import Dropdown from 'react-bootstrap/Dropdown';

function AdminRegister() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  })
  
  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('', values)
      .then(res => {
        if (res.data.Status === "Success") {
          navigate("/Adminlogin");
        }
        else {
          alert("Error")
        }
      })
      .then(err => console.log(err));
  }
  return (
    <div className='register d-flex justify-content-center align-items-center vh-110'>
      <div className='glass1 p-3 rounded'>
        <div className='mb-5'>
        <h2>Register</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='d-flex flex-row justify-content-around'>
            <div className='mb-3'>
              <label htmlFor="name"><strong>First Name</strong></label>
              <input type="text" placeholder='Enter Name' name='name'
                onChange={e => setValues({ ...values, name: e.target.value })} className="form-control rounded-0" required />

            </div>
            <div className='mb-3'>
              <label htmlFor="name"><strong>Last Name</strong></label>
              <input type="text" placeholder='Enter Name' name='name'
                onChange={e => setValues({ ...values, name: e.target.value })} className="form-control rounded-0" required />

            </div>

          </div>
          <div className='d-flex flex-row justify-content-around'>
            <div className='mb-3'>
              <label htmlFor="email"><strong>Email</strong></label>
              <input type="email" placeholder='Enter Email' name='email'
                onChange={e => setValues({ ...values, email: e.target.value })} className="form-control rounded-0" required />
            </div>
            <div className='mb-3'>
              <label htmlFor="password"><strong>Password</strong></label>
              <input type="password" placeholder='Enter Password' name='password'
                onChange={e => setValues({ ...values, password: e.target.value })} className="form-control rounded-0" required />
            </div>

          </div>
          <div className='d-flex flex-row justify-content-around'>
            <div className='mb-3'>
              <label htmlFor="phone"><strong>Address</strong></label>
              <input type="number" placeholder='Enter Address' name='phone'
                onChange={e => setValues({ ...values, phone: e.target.value })} className="form-control rounded-0" required />
            </div>
            <div className='mb-3'>
              <label htmlFor="phone"><strong>Phone number</strong></label>
              <input type="number" placeholder='Enter Phone number' name='phone'
                onChange={e => setValues({ ...values, phone: e.target.value })} className="form-control rounded-0" required />
            </div>
          </div>

          <div className='mb-3 d-flex justify-content-around'>
            <label htmlFor="gender" className=' mr-5'><strong>Gender:</strong></label>

            <div class="form-check form-check-inline mb-3">
              <input className="form-check-input" type="radio" value="option1" />
              <label className="form-check-label" for="inlineCheckbox1">Male</label>
            </div>
            <div className="form-check form-check-inline mb-3">
              <input className="form-check-input" type="radio" value="option2" />
              <label classNmae="form-check-label" for="inlineCheckbox2">Female</label>
            </div>

          </div>

          <div className='mb-3 d-flex justify-content-around'>
            <label htmlFor="gender" className=' mr-5'><strong>Job title:</strong></label>

            <Dropdown>
      <Dropdown.Toggle  id="dropdown-basic">
        Choose job title
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Admin</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Kitchen</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Casher</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
          </div>

          <div className='d-flex flex-row justify-content-around'>
            <div className='mb-3'>
              <label htmlFor="password"><strong>Date of hire</strong></label>
              <input type="password" placeholder='Enter Date' name='password'
                onChange={e => setValues({ ...values, password: e.target.value })} className="form-control rounded-0" required />
            </div>
            <div className='mb-3'>
              <label htmlFor="phone"><strong>Salary Information</strong></label>
              <input type="amount" placeholder='Enter salary' name='phone'
                onChange={e => setValues({ ...values, phone: e.target.value })} className="form-control rounded-0" required />
            </div>
          </div>
          <div className='mb-3 d-flex justify-content-around'>
            <label htmlFor="gender" className=' mr-5'><strong>Employee Status:</strong></label>

            <div class="form-check form-check-inline">
              <input className="form-check-input" type="radio" value="option1" />
              <label className="form-check-label" for="inlineCheckbox1">Part-time</label>
            </div>
            <div class="form-check form-check-inline mb-3">
              <input className="form-check-input" type="radio" value="option1" />
              <label className="form-check-label" for="inlineCheckbox1">Full-time</label>
            </div>
          </div>
          <p><input className="form-check-input mb-3" type="checkbox" value="option1" /> &nbsp; I have read and accept the terms and policies</p>
          <button type='submit' className='btn btn1 w-50 rounded-12 mb-3'>Register</button>
        

        </form>
      </div>

    </div>
  )
}

export default AdminRegister

