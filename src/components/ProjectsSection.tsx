import React, { useRef, useEffect, useState } from 'react';
import { Project } from '../types/projects';
import '../styles/projectssection.css';
import link from '../assets/link.svg';
import youtube from '../assets/youtube.svg';
import devpost from '../assets/devpost.svg';
import github from '../assets/github.svg';

interface ProjectsSectionProps {
  projects: Project[];
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const projectsContainerRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number>(0);
  const [showProject, setShowProject] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowProject(true), 500);
  }, []);

  useEffect(() => {
    const container = projectsContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;
      let closestIndex = 0;
      let minDistance = Infinity;

      Array.from(container.children).forEach((child, index) => {
        const childRect = child.getBoundingClientRect();
        const childCenter = childRect.left + childRect.width / 2;
        const distance = Math.abs(childCenter - containerCenter);

        const maxScale = 1.5;
        const scale = Math.max(1, maxScale - (distance / (containerRect.width / 2)) * (maxScale - 1));
        
        (child as HTMLElement).style.transform = `scale(${scale})`;

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setExpandedIndex(closestIndex);
    };

    container.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [projects]);

  useEffect(() => {
    if (projectsContainerRef.current) {
      const container = projectsContainerRef.current;
      container.scrollLeft = 0;  
    }
  }, [projects]);

  const renderLinkIcons = (project: Project) => {
    return (
      <div className="project-links">
        {project.website && (
          <a href={project.website} target="_blank" rel="noopener noreferrer">
            <img src={link} alt="Website" className="link-icon" />
          </a>
        )}
        {project.youtube && (
          <a href={project.youtube} target="_blank" rel="noopener noreferrer">
            <img src={youtube} alt="YouTube" className="link-icon" />
          </a>
        )}
        {project.devpost && (
          <a href={project.devpost} target="_blank" rel="noopener noreferrer">
            <img src={devpost} alt="Devpost" className="link-icon" />
          </a>
        )}
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer">
            <img src={github} alt="GitHub" className="link-icon" />
          </a>
        )}
      </div>
    );
  };

  return (
    <div className={`projects-section ${showProject ? 'fade-in' : ''}`}>
      <div className="projects-scroll-container">
        <div className="projects-container" ref={projectsContainerRef}>
          {projects.map((project, index) => (
            <div
              key={index}
              className={`project ${expandedIndex === index ? 'expanded' : ''} ${project.phone ? 'phone' : ''}`}
            >
              {expandedIndex === index ? (
                <video
                src={project.videoUrl}
                autoPlay
                loop
                muted
                className="project-video"
              />
              ) : (
                <div
                  className="project-image"
                  style={{ backgroundImage: `url(${project.imageUrl})` }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      {expandedIndex !== null && (
        <div className="expanded-project-info">
          <div className="project-title-container">
            <h3>{projects[expandedIndex].title}</h3>
            {renderLinkIcons(projects[expandedIndex])}
          </div>
          <p>{projects[expandedIndex].description}</p>
        </div>
      )}
    </div>
  );
};

export default ProjectsSection;