import React from 'react';
import '../styles/contactsection.css';
import profile from '../assets/nick.jpg'; 

const ContactSection: React.FC = () => {
  return (
    <div id="contactSection" className="grey-section">
      <div className="profile-container">
        <div className="profile-left">
          <img src={profile} alt={"Nicholas Ho"} className="profile-image" />
          <div className="profile-info">
            <h2>{"Nicholas Ho (he/him)"}</h2>
            <div className="profile-details">
              <p>{"UCSD '25"}</p>
              <div className="social-buttons">
                <a href="https://www.linkedin.com/in/nho-way" target="_blank" rel="noopener noreferrer" className="social-button">
                  <svg fill="currentColor" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8Z" />
                    <path d="M5 10C5 9.44772 5.44772 9 6 9H7C7.55228 9 8 9.44771 8 10V18C8 18.5523 7.55228 19 7 19H6C5.44772 19 5 18.5523 5 18V10Z" />
                    <path d="M11 19H12C12.5523 19 13 18.5523 13 18V13.5C13 12 16 11 16 13V18.0004C16 18.5527 16.4477 19 17 19H18C18.5523 19 19 18.5523 19 18V12C19 10 17.5 9 15.5 9C13.5 9 13 10.5 13 10.5V10C13 9.44771 12.5523 9 12 9H11C10.4477 9 10 9.44772 10 10V18C10 18.5523 10.4477 19 11 19Z" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M20 1C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20Z" />
                  </svg>
                  <span className="social-text">Nho-way</span>
                </a>
                <a href="https://devpost.com/nho-way" target="_blank" rel="noopener noreferrer" className="social-button">
                  <svg fill="currentColor" width="20px" height="20px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.002 1.61 0 12.004 6.002 22.39h11.996L24 12.004 17.998 1.61zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31 0 4.436-3.21 6.302-6.456 6.302H7.595zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861.009-2.569-1.096-3.853-3.767-3.853z"/>
                  </svg>
                  <span className="social-text">Nho-way</span>
                </a>
                <a href="https://github.com/nho-way" target="_blank" rel="noopener noreferrer" className="social-button">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                  <span className="social-text">Nho-way</span>
                </a>
                <a href={`mailto:${"nickho.lv@gmail.com"}`} className="social-button mail-icon">
                  <svg width="24px" height="24px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.75 5.25L3 6V18L3.75 18.75H20.25L21 18V6L20.25 5.25H3.75ZM4.5 7.6955V17.25H19.5V7.69525L11.9999 14.5136L4.5 7.6955ZM18.3099 6.75H5.68986L11.9999 12.4864L18.3099 6.75Z"/>
                  </svg>
                  <span className="social-text">nickho.lv@gmail.com</span>
                </a>
              </div>
            </div>
            <p>Hello! Please hit me up about any of my projects or hobbies: pickleball, ping pong, golf, and cooking!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;