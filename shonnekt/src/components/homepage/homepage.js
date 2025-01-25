import React from 'react';
import emailjs from 'emailjs-com';
import './homepage.sass';
import { useState } from 'react';
import BackImg  from '../assets/bg.jpeg';
import DeskImg from '../assets/hero-desktop.png';
import TabImg from '../assets/hero-mobile.png';
import Arrow from '../assets/icon-arrow.svg';
import Error from '../assets/icon-error.svg';

function Homepage() {
  let hideError = {
      opacity: 0,
  };
  const [error, setError] = useState(hideError);
  const [btnStatus, setBtnStatus] = useState(true);
  const [message, setMessage] = useState("");  // State for notification message

  const storeEmail = (event) => {
      event.preventDefault();
      const emailInput = document.getElementById("mail").value;

      console.log("Attempting to send email with the input: ", emailInput);

      emailjs
          .send('service_ktq43ys', 'template_zhysp9i', {
              user_email: emailInput,
          }, 'o6k1IZDKfwdrU2RYR')
          .then((result) => {
              console.log('Email sent successfully:', result.text);
              setMessage("Thanks for joining our waitlist!");  // Update message after success
          })
          .catch((error) => {
              console.error('Error while sending email:', error.text);
              setMessage("Failed to send email. Please try again.");
          });
  };

  const checkMail = (event) => {
      let pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
      let emailInput = event.target.value;

      console.log("Email input on change:", emailInput);

      let showError = {
          opacity: 1,
      };

      if (emailInput.match(pattern) || emailInput === "") {
          setError(hideError);
          event.target.style.border = "1px solid hsl(0, 36%, 80%)";
          setBtnStatus(false);
      } else {
          setError(showError);
          event.target.style.border = "2px solid hsl(0, 93%, 68%)";
          setBtnStatus(true);
      }
      if (emailInput === "") {
          setBtnStatus(true);
      }
  };

  return (
      <header>
          <div className="textcontent">
              <figure>
                  <img src={BackImg} alt="" />
              </figure>
              <div className="text-area">
                  <h1 className="main-title">shonnekt</h1>
                  <p>Sell and shop from anywhere in India with just a click – Shonnekt makes it easy!</p>
                  <form onSubmit={storeEmail}>
                      <input
                          type="text"
                          placeholder="Email Address"
                          autoFocus
                          id="mail"
                          onInput={checkMail}
                      />
                      <label htmlFor="mail" className="error" style={error}>
                          Please provide a valid email
                      </label>
                      <div className="error-icon error" style={error}>
                          <img src={Error} alt="" />
                      </div>
                      <button
                          type="submit"
                          disabled={btnStatus}
                      >
                          <img src={Arrow} alt="" />
                      </button>
                  </form>
                  {/* Display message after form submission */}
                  {message && (
                      <div className="notification-message">
                          <p>{message}</p>
                      </div>
                  )}
              </div>
          </div>
          <picture>
              <source media="(max-width: 1024px)" srcSet={TabImg} />
              <img src={DeskImg} alt="" />
          </picture>
      </header>
  );
}

export default Homepage;