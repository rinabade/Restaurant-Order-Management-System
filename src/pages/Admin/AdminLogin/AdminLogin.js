import React from 'react'
import './AdminLogin.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'

function AdminLogin() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const [showPopup, setShowPopup] = useState(false);
    const [resetEmail, setResetEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('', values)
            .then(res => {
                if (res.data.Status === "Success") {
                    navigate("/admin/Dashboard");
                }
                else {
                    alert("Error")
                }
            })
            .then(err => console.log(err));
    };

    const handleResetEmailChange = (event) => {
        setResetEmail(event.target.value);
    };
    const handleSendResetEmail = () => {
    axios
    .post('/reset-password', { email: resetEmail })
    .then((res) => {
      console.log(res.data);
     
      setShowPopup(false);
      alert('Reset email sent!');
    })
    .catch((err) => {
      
      console.log(err);
      
      alert('Error sending reset email');
    });
};
    return (
        <div className='login d-flex justify-content-center align-items-center vh-100'>
            <div className='glass p-3 rounded w-45'>
                <h2>Sign In</h2>
                <form className='mt-4' onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder='Enter Email' name='name'
                            onChange={e => setValues({ ...values, email: e.target.value })} className="form-control rounded-0" required />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder='Enter Password' name='name'
                            onChange={e => setValues({ ...values, password: e.target.value })} className="form-control rounded-0" required />
                    </div >
                    <div className="align-items-center d-flex justify-content-center">
                        <button type='submit' className='btn btn3 w-50 rounded-12  mt-3 mb-3'>Log in</button>
                    </div>
                    <div className='forget text-primary'>
                        <p onClick={() => setShowPopup(true)}>Forget Password?</p>
                    </div>
                </form>
            </div>
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                          <button
                            type="button"
                            className="btn btn-close"
                            onClick={() => setShowPopup(false)}
                        >
                            
                        </button>
                        <h3>Reset Password</h3>
                        <form className='mt-4'>
                            <div className="mb-3">
                                <label htmlFor="reset-email">
                                    <strong>Email</strong>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Enter Email"
                                    name="reset-email"
                                    value={resetEmail}
                                    onChange={handleResetEmailChange}
                                    className="form-control rounded-0"
                                    required
                                />
                            </div>
                            <div className="align-items-center d-flex justify-content-center">
                                <button
                                    type="button"
                                    className="btn btn3 w-50 rounded-12 mt-3 mb-3"
                                    onClick={handleSendResetEmail}
                                >
                                    Send
                                </button>
                            </div>
                        </form>
                      
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminLogin
