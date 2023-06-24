import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import "bootstrap/dist/css/bootstrap.css";
import { AuthProvider } from './context/AuthProvider';

// ReactDOM.render(
//   <React.StrictMode>
//   <AuthProvider>
//     <App />
//   </AuthProvider>
//   </React.StrictMode>,
//   document.getElementById('root')
// );
import 'jquery';
import 'popper.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

createRoot(document.getElementById('root')).render(<App />);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
