import React from 'react';
import ContactSection from '../components/ContactSection';
import '../styles/resume.css';

const Resume: React.FC = () => {
  return (
    <div className="resume-page">
      <div className="resume-container">
        <h1 className="resume-title">Work Experience</h1>
        <div className="resume-experience-item">
          <div className="resume-date">Jun 2024 — Sep 2024</div>
          <div className="resume-details">
            <h2 className="resume-job-title">Software Development Intern at Amazon Web Services</h2>
            <h3 className="resume-job-location">Bellevue, WA</h3>
            <ul className="resume-job-description">
              <li>Hello</li>
              <li>Bye</li>
              <li>Sup</li>
            </ul>
          </div>
        </div>
        <div className="resume-experience-item">
          <div className="resume-date">Feb 2024 — Jun 2024</div>
          <div className="resume-details">
            <h2 className="resume-job-title">TA at UCSD CSE Department</h2>
            <h3 className="resume-job-location">San Diego, CA</h3>
            <ul className="resume-job-description">
              <li>Hello</li>
              <li>Bye</li>
              <li>Sup</li>
            </ul>
          </div>
        </div>
        <div className="resume-experience-item">
          <div className="resume-date">Oct 2023 — Jun 2024</div>
          <div className="resume-details">
            <h2 className="resume-job-title">ML Lead at Yonder Dynamics</h2>
            <h3 className="resume-job-location">San Diego, CA</h3>
            <ul className="resume-job-description">
              <li>Hello</li>
              <li>Bye</li>
              <li>Sup</li>
            </ul>
          </div>
        </div>
        <div className="resume-experience-item">
          <div className="resume-date">Jan 2023 — Sep 2023</div>
          <div className="resume-details">
            <h2 className="resume-job-title">Technician at UCSD ITS</h2>
            <h3 className="resume-job-location">San Diego, CA</h3>
            <ul className="resume-job-description">
              <li>Hello</li>
              <li>Bye</li>
              <li>Sup</li>
            </ul>
          </div>
        </div>
        <div className="resume-experience-item">
          <div className="resume-date">Jun 2022 — Sep 2022</div>
          <div className="resume-details">
            <h2 className="resume-job-title">Software Engineer Intern at Riorey</h2>
            <h3 className="resume-job-location">Bethesda, MD</h3>
            <ul className="resume-job-description">
              <li>Hello</li>
              <li>Bye</li>
              <li>Sup</li>
            </ul>
          </div>
        </div>
        <h1 className="resume-title">Projects</h1>
        <div className="resume-experience-item">
          <div className="resume-date">2024</div>
          <div className="resume-details">
            <h2 className="resume-job-title">Personal Website</h2>
            <ul className="resume-job-description">
              <li>Rag</li>
              <li>Distribute Computing</li>
            </ul>
          </div>
        </div>
        <div className="resume-experience-item">
          <div className="resume-date">2024</div>
          <div className="resume-details">
            <h2 className="resume-job-title">Nature Quest</h2>
            <ul className="resume-job-description">
              <li>React Native</li>
            </ul>
          </div>
        </div>
        <div className="resume-experience-item">
          <div className="resume-date">2023</div>
          <div className="resume-details">
            <h2 className="resume-job-title">VR World</h2>
            <ul className="resume-job-description">
              <li>Maveric Studios</li>
            </ul>
          </div>
        </div>
        <div className="resume-experience-item">
          <div className="resume-date">2023</div>
          <div className="resume-details">
            <h2 className="resume-job-title">Sheepish</h2>
            <ul className="resume-job-description">
              <li>Cal Hacks</li>
            </ul>
          </div>
        </div>
        <div className="resume-experience-item">
          <div className="resume-date">2023</div>
          <div className="resume-details">
            <h2 className="resume-job-title">Tarot Cards</h2>
            <ul className="resume-job-description">
              <li>Group Project</li>
            </ul>
          </div>
        </div>
        <h1 className="resume-title">Education</h1>
        <div className="resume-experience-item">
          <div className="resume-date">2021-2025</div>
          <div className="resume-details">
            <h2 className="resume-job-title">University of California, San Diego</h2>
            <h3 className="resume-job-location">San Diego, CA</h3>
            <ul className="resume-job-description">
              <li>BS Computer Science</li>
            </ul>
          </div>
        </div>
      </div>
      <ContactSection />
    </div>
  );
};

export default Resume;