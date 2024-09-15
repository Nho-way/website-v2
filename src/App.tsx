import React, { useEffect, useState } from 'react';
import { Route, Routes, Link, useNavigate, useLocation } from 'react-router-dom';
import BoidSimulation from './components/BoidSimulation';
import Resume from './pages/resume';
import naturequest from './assets/naturequest.png';
import sheepish from './assets/sheepish.png';
import whitesheep from './assets/whitesheep.svg';
import note from './assets/note.svg';
import ContactSection from './components/ContactSection';

import './App.css';

interface Project {
  title: string;
  description: string;
  imageUrl: string;
  href: string;
  icon?: string;
  iconClass?: string;
}

const projects: Project[] = [
  {
    title: "Nature Quest",
    description: "Capture Your Moment in the Wild",
    imageUrl: naturequest,
    href: "https://example.com/project1",
    icon: note,
    iconClass: "project-icon-note"
  },
  {
    title: "Sheepish",
    description: "The Vocal Herding Adventure",
    imageUrl: sheepish,
    href: "https://example.com/project2",
    icon: whitesheep,
    iconClass: "project-icon-sheep"
  }
];

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const helloWorld = document.getElementById('helloWorld');
    if (helloWorld && location.pathname === '/') {
      helloWorld.style.opacity = '0';
      helloWorld.style.display = 'block';
      
      setTimeout(() => {
        helloWorld.style.transition = 'opacity 4s ease-in-out';
        helloWorld.style.opacity = '1';
      }, 100);
    }
  }, [location]);

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contactSection');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navigateToResume = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/resume');
  };

  return (
    <div className="container">
      <header>
        <Link to="/" className={`header-name ${isScrolled ? 'scrolled' : ''}`}>
          <span className="full-name">Nicholas Ho</span>
          <span className="short-name">NH</span>
        </Link>
        <input 
          type="checkbox" 
          id="menu-toggle" 
          className="menu-toggle" 
          checked={isMenuOpen}
          onChange={() => setIsMenuOpen(!isMenuOpen)}
        />
        <label htmlFor="menu-toggle" className="hamburger">
          <span></span>
          <span></span>
          <span></span>
        </label>
        <nav>
          <button>Agent N</button>
          <button onClick={navigateToResume}>Resume</button>
          <button onClick={scrollToContact}>Contact</button>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <div className="black-box">
                <BoidSimulation/>
                <div className="hello-world-container">
                  <h1 id="helloWorld" className="hello-world">Hello World</h1>
                </div>
              </div>
              <div className="white-section">
                <h2 className="section-title">Past Projects</h2>
                <div className="projects-container">
                  {projects.map((project, index) => (
                    <a key={index} href={project.href} className="project" style={{backgroundImage: `url(${project.imageUrl})`}}>
                      <div className="project-overlay">
                        <h3>{project.title}</h3>
                        <p className="project-description">{project.description}</p>
                      </div>
                      {project.icon && (
                        <img src={project.icon} alt={`${project.title} icon`} className={`project-icon ${project.iconClass}`} />
                      )}
                    </a>
                  ))}
                </div>
              </div>
              <ContactSection />
            </>} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;