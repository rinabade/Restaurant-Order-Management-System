import React from 'react'
import './KitchenLogin.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { loginUser } from '../../../api/authAction'
import PropTypes from 'prop-types';
import useToken from "../../../components/Token/useToken";

function KitchenLogin() {
  const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const { setToken } = useToken();

    const refreshPage = () => {
        navigate(0);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await loginUser({email,password})
        .then((response) => {
            setToken(response.data);

            refreshPage();
        })
        .catch((error) => {
            console.error(error);
        });
    }

    const [showPopup, setShowPopup] = useState(false);
    
    const [resetEmail, setResetEmail] = useState({
        email : ""
    })

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
        <div className='kitchenlogin d-flex justify-content-center align-items-center vh-100'>
            <div className='kitchenglass p-3 rounded w-45'>
                <h2>Sign in</h2>
                <form className='mt-4' onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder='Enter Email' name='name'
                            onChange={e => setEmail(e.target.value)} autoComplete='off'  required />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input type="password" placeholder='Enter Password' name='name'
                             onChange={e => setPassword(e.target.value)}  className="passwordfield" autoComplete='off' required />
                    </div >
                    <div className='forget text-primary'>
                        <p onClick={() => setShowPopup(true)}>Forget Password?</p>
                    </div>
                    <div className="align-items-center d-flex justify-content-center">
                        <button type='submit' className='btn kitchenbtn3 w-50 rounded-12  mt-3 mb-3'>Log in</button>
                    </div>
                </form>
            </div>
            {showPopup && (
                <div className="popup">
                    <div className="kitchenpopup-content">
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
                                    value={resetEmail.email}
                                    onChange={handleResetEmailChange}
                                    autoComplete='off'
                                    required
                                />
                            </div>
                            <div className="align-items-center d-flex justify-content-center">
                                <button
                                    type="button"
                                    className="btn kitchenbtn3 w-50 rounded-12 mt-3 mb-3"
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
KitchenLogin.propTypes = {
    setToken: PropTypes.func.isRequired
  }
export default KitchenLogin










