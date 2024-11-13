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
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const container = projectsContainerRef.current;
    if (!container) return;

    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      if (isScrollingRef.current) return;

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const containerRect = container.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;
        let closestIndex = 0;
        let minDistance = Infinity;

        Array.from(container.children).forEach((child, index) => {
          const childRect = child.getBoundingClientRect();
          const childCenter = childRect.left + childRect.width / 2;
          const distance = Math.abs(childCenter - containerCenter);

          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
          }
        });

        setSelectedIndex(closestIndex);
      }, 50); // Small delay to prevent rapid updates
    };

    container.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [projects]);

  const scrollToProject = (index: number) => {
    const container = projectsContainerRef.current;
    if (!container) return;

    isScrollingRef.current = true;
    setSelectedIndex(index);

    const children = Array.from(container.children);
    if (children[index]) {
      const child = children[index];
      const childRect = child.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      const scrollLeft = container.scrollLeft + childRect.left - containerRect.left - (containerRect.width - childRect.width) / 2;
      
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });

      // Reset the scrolling flag after animation
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 500); // Match this with your scroll animation duration
    }
  };

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
    <div className="projects-section">
      <div className="projects-scroll-container">
        <div className="projects-container" ref={projectsContainerRef}>
          {projects.map((project, index) => (
            <div key={index} className="project">
              {selectedIndex === index ? (
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
      {selectedIndex !== null && (
        <div className="expanded-project-info">
           <div className="project-titles">
          {projects.map((project, index) => (
            <button
              key={index}
              onClick={() => scrollToProject(index)}
              className={`project-title ${selectedIndex === index ? 'active' : ''}`}
            >
              {project.title}
            </button>
          ))}
        </div>
        <div className="project-description">
          {renderLinkIcons(projects[selectedIndex])}
          <p>{projects[selectedIndex].description}</p>
        </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsSection;