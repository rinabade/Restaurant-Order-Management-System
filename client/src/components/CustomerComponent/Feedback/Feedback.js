import React, { useState } from 'react';
import { FiMail, FiMessageCircle } from 'react-icons/fi';
import "./Feedback.css";

const Feedback = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform form submission logic here
    // e.g., send the feedback to the server

    // Reset form fields
    setEmail('');
    setMessage('');
  };

  return (
    <div className='feedback-form'>
      <form onSubmit={handleSubmit}>
        <div className="input-group1">
          <FiMail className="input-icon" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="input-group1">
          <FiMessageCircle className="input-icon" />
          <textarea
            placeholder="Message"
            value={message}
            onChange={handleMessageChange}
            required
          />
        </div>
        <button className='submitbtn' type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Feedback;
