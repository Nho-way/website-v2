import React from 'react';
import '../styles/header.css';
import resume from '../assets/resume.pdf'

const Header: React.FC = () => {
    const handleResumeClick = () => {
      window.open(resume, '_blank', 'noopener,noreferrer');
    };

    return (
      <div className="header">
        <div className="header-content">
        <h1 className="gradient-text">
          {"Nicholas Ho".split("").map((letter, index) => (
          <span key={index} className="gradient-letter">
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
        </h1>
          <div className="social-buttons">
            <a href="https://linkedin.com/in/nho-way" target="_blank" rel="noopener noreferrer" className="social-text">LinkedIn</a>
            <a href={`mailto:${"nickho.lv@gmail.com"}`} className="social-text">Email</a>
            <a href="https://github.com/nho-way" target="_blank" rel="noopener noreferrer" className="social-text">Github</a>
            <a href="https://devpost.com/nho-way" target="_blank" rel="noopener noreferrer" className="social-text">Devpost</a>
          </div>
        </div>
      </div>
    );
  };
  
  export default Header;