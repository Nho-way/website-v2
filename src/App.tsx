import ProjectsSection from './components/ProjectsSection';
import Header from './components/Header';
import BoidSimulation from './components/BoidSimulation';
import { Project } from './types/projects';

import naturevid from './assets/NatureQuest.mp4';
import naturequest from './assets/naturequest.png';
import sheepish from './assets/sheepish.png';
import sheepishvid from './assets/Sheepish.mp4';
import tarot from './assets/tarot.png';
import futurenow from './assets/future_now.mp4';
import vrimage from './assets/vrworld.png';
import vrvideo from './assets/vrworld.mp4';

import './App.css';

const projects: Project[] = [
  {
    title: "VR World",
    description: "A Unity App which employs GPT 4 and Whisper to process users' vocal commands and dynamically spawn the requested objects into their environment",
    imageUrl: vrimage,
    videoUrl: vrvideo,
    youtube: "https://youtu.be/KvhvinBro-o",
    phone: false,
    iconClass: "project-icon-vr"
  },
  {
    title: "Sheepish",
    description: "A fun, interactive game, built with Typescript and Large Language Models (Hume Expression Measurement), where players earn points by embodying a target emotion",
    imageUrl: sheepish,
    devpost: "https://devpost.com/software/sheepish",
    github: "https://github.com/jhxyjhxy/rnjr",
    videoUrl: sheepishvid,
    phone: false,
    iconClass: "project-icon-sheep"
  }, 
  {
    title: "Future Now",
    description: "An introduction to full stack development: Utilized CSS, HTML, and Javascript to create a Tarot Card and 8-Ball website",
    imageUrl: tarot,
    website: "https://cse110-sp23-group24-final-project.vercel.app/",
    github: "https://github.com/cse110-sp23-group24/cse110-sp23-group24-Final-Project",
    videoUrl: futurenow,
    phone: false,
    iconClass: "project-icon-tarot"
  },
  {
    title: "Nature Quest",
    description: "A mobile app in React Native that wields Gemini to curate daily outdoor adventures based on users' locations and awards points for completing these activities and sharing it with friends",
    imageUrl: naturequest,
    devpost: "https://devpost.com/software/naturequest-capture-your-moments-in-the-wild",
    github: "https://github.com/jhxyjhxy/jarn",
    videoUrl: naturevid,
    iconClass: "project-icon-note",
    phone: true
  }
];

function App() {
  return (
    <main>
      <div className="intro-container">
        <div className="boid-container">
          <BoidSimulation />
        </div>
        <div className="backdrop-overlay"></div>
        <Header />
      </div>
      <div className="info-container">
        <div className="about-me">
          <h2>About Me</h2>
          <h3>Hello, I'm Nick! <span className="emphasis">I like learning new 
            things and solving problems.</span> I'm currently learning how to 
            play the piano and working on solving climate issues at the Scripps 
            Institute of Oceanography.</h3>
          <h3>Some of my hobbies include pickleball, baking, and exploring nature. 
           Please check out my LinkedIn, GitHub, and Devpost above!</h3>
        </div>
        <div className="projects">
          <h2>My Past Projects</h2>
        </div>
        <ProjectsSection projects={projects} />
        <div className="contact">
          <h2>Get In Contact</h2>
          <h3>
            I'm currently based in San Diego, California. Please feel free to 
            reach out. Let's <span className="animated-name">solve </span> problems together!
          </h3>
          <div className="contact-buttons">
            <a href="https://www.linkedin.com/in/nho-way" target="_blank" rel="noopener noreferrer" className="contact-button">
              <svg fill="currentColor" width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.5 8C7.32843 8 8 7.32843 8 6.5C8 5.67157 7.32843 5 6.5 5C5.67157 5 5 5.67157 5 6.5C5 7.32843 5.67157 8 6.5 8Z" />
                <path d="M5 10C5 9.44772 5.44772 9 6 9H7C7.55228 9 8 9.44771 8 10V18C8 18.5523 7.55228 19 7 19H6C5.44772 19 5 18.5523 5 18V10Z" />
                <path d="M11 19H12C12.5523 19 13 18.5523 13 18V13.5C13 12 16 11 16 13V18.0004C16 18.5527 16.4477 19 17 19H18C18.5523 19 19 18.5523 19 18V12C19 10 17.5 9 15.5 9C13.5 9 13 10.5 13 10.5V10C13 9.44771 12.5523 9 12 9H11C10.4477 9 10 9.44772 10 10V18C10 18.5523 10.4477 19 11 19Z" />
                <path fillRule="evenodd" clipRule="evenodd" d="M20 1C21.6569 1 23 2.34315 23 4V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H20ZM20 3C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3H20Z" />
              </svg>
            </a>
            <a href={`mailto:${"nickho.lv@gmail.com"}`} className="contact-button mail-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" strokeWidth="0">
                <path fillRule="evenodd" clipRule="evenodd" d="M3.75 5.25L3 6V18L3.75 18.75H20.25L21 18V6L20.25 5.25H3.75ZM4.5 7.6955V17.25H19.5V7.69525L11.9999 14.5136L4.5 7.6955ZM18.3099 6.75H5.68986L11.9999 12.4864L18.3099 6.75Z"/>
              </svg>
            </a>
            <a href="https://github.com/nho-way" target="_blank" rel="noopener noreferrer" className="contact-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
export default App;