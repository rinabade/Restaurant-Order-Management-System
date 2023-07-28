import React, { useState } from 'react';
import { FiMail, FiMessageCircle , FiUser} from 'react-icons/fi';
import "./Feedback.css";
import { createFeedback } from '../../../api/userAction';
import { Navigate } from 'react-router-dom';

const Feedback = () => {

  const [data, setData] = useState({
    fullname: "",
    email : "",
    message : ""
  });

  const refreshPage = ()=>{
    Navigate(0)
  }

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createFeedback(data)
    .then((response) => {
      console.log(response.data);
      refreshPage();
    })
    .catch((error) => {
      console.error(error);
    });
  };

  return (
    <div className='feedback-form'>
      <form onSubmit={handleSubmit}>
      <div className="input-group1">
      <FiUser className="input-icon" />
          <textarea
            type="text"
            name = "fullname"
            placeholder="Full Name"
            value={data.fullname}
            onChange={handleChange}
            autoComplete='off'
            required
          />
        </div>
        <div className="input-group1">
          <FiMail className="input-icon" />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
            autoComplete='off'
            required
          />
        </div>
        <div className="input-group1">
          <FiMessageCircle className="input-icon" />
          <textarea
            placeholder="Message"
            name="message"
            value={data.message}
            onChange={handleChange}
            autoComplete='off'
            required
          />
        </div>
        <button className='submitbtn' type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Feedback;
