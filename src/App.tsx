import React, { useEffect, useState } from 'react';
import { Route, Routes, Link, useNavigate, useLocation } from 'react-router-dom';

import BoidSimulation from './components/BoidSimulation';
import ContactSection from './components/ContactSection';
import ProjectsSection from './components/ProjectsSection';
import AgentN from './pages/agentn';
import Resume from './pages/resume';
import { Project } from './types/projects';

import agent from './assets/agent.png';
import hat from './assets/hat.svg';
import naturequest from './assets/naturequest.png';
import note from './assets/note.svg';
import sheepish from './assets/sheepish.png';
import tarot from './assets/tarot.png';
import vrimage from './assets/VRWorld.png';
import whitesheep from './assets/whitesheep.svg';

import './App.css';

const projects: Project[] = [
  {
    title: "Agent N",
    description: "An LLM in Beta",
    imageUrl: agent,
    href: "https://devpost.com/software/naturequest-capture-your-moments-in-the-wild",
    icon: hat,
    iconClass: "project-icon-agent"
  },
  {
    title: "Future Now",
    description: "A Tarot Card Project",
    imageUrl: tarot,
    href: "https://github.com/software/sheepish",
    iconClass: "project-icon-tarot"
  },
  {
    title: "Sheepish",
    description: "The Vocal Herding Adventure",
    imageUrl: sheepish,
    href: "https://devpost.com/software/sheepish",
    icon: whitesheep,
    iconClass: "project-icon-sheep"
  }, 
  {
    title: "VR World",
    description: "Shape Your World",
    imageUrl: vrimage,
    href: "https://github.com/software/sheepish",
    iconClass: "project-icon-vr"
  },
  {
    title: "Nature Quest",
    description: "Capture Your Moment in the Wild",
    imageUrl: naturequest,
    href: "https://devpost.com/software/naturequest-capture-your-moments-in-the-wild",
    icon: note,
    iconClass: "project-icon-note"
  },
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
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
  
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isMenuOpen]);

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contactSection');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navigateToResume = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/resume');
    setIsMenuOpen(false);
  };

  const navigateToAgentN = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/agentn');
    setIsMenuOpen(false);
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
          <button onClick={navigateToAgentN}>Agent N</button>
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
              <ProjectsSection projects={projects} />
              <ContactSection />
            </>} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/agentn" element={<AgentN />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;