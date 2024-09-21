import React, { useRef, useEffect, useState } from 'react';
import { Project } from '../types/projects';
import '../styles/projectssection.css';

interface ProjectsSectionProps {
    projects: Project[];
  }

  const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
    const projectsContainerRef = useRef<HTMLDivElement | null>(null);
    const [showScrollButtons, setShowScrollButtons] = useState(false);
  
    useEffect(() => {
      const checkScrollButtons = () => {
        const container = projectsContainerRef.current;
        if (container) {
          setShowScrollButtons(container.scrollWidth > container.clientWidth);
        }
      };
  
      checkScrollButtons();
      window.addEventListener('resize', checkScrollButtons);
      return () => window.removeEventListener('resize', checkScrollButtons);
    }, []);
  
    const scrollProjects = (direction: 'left' | 'right') => {
      const container = projectsContainerRef.current;
      if (container) {
        const scrollAmount = 300; // Width of one project
        container.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: 'smooth'
        });
      }
    };
  
    return (
      <div className="white-section">
        <div className="section-title-container">
          <h2 className="section-title">Past Projects</h2>
        </div>
        <div className="projects-scroll-container">
          <div className="projects-container" ref={projectsContainerRef}>
            {projects.map((project, index) => (
              <a key={index} href={project.href} target="_blank" rel="noopener noreferrer" className="project" style={{backgroundImage: `url(${project.imageUrl})`}}>
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
          {showScrollButtons && (
            <>
              <button className="scroll-button left" onClick={() => scrollProjects('left')}>&lt;</button>
              <button className="scroll-button right" onClick={() => scrollProjects('right')}>&gt;</button>
            </>
          )}
        </div>
      </div>
    );
  };
  
  export default ProjectsSection;