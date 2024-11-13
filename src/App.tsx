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
    description: "Harnessed LLMs (Hume Expression Measurement) to identify the player's emotional tone and Typescript to create a fun, interactive game where users earn points by embodying the target emotion",
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
          <h3><span className="emphasis">I love building things. </span>  
          I'm passionate about technology solving problems with sustainable 
          solutions. I previously interned at Amazon Web Services, where I
          helped build new customer-facing features and am currently a 
          undergraduate researcher at the Scripps Institute of Oceanography.</h3>
          <h3>Some of my hobbies include pickleball, baking, and exploring nature. 
           Please check out my LinkedIn, GitHub, and Devpost above!</h3>
        </div>
        <div className="projects">
          <h2>My Past Projects</h2>
        </div>
        <ProjectsSection projects={projects} />
        <div className="contact">
          <h2>Let's Get In Contact</h2>
          <h3>
            I'm currently based in San Diego, California. Please feel free to 
            reach out whenever! Let's talk about the <span className="animated-name">possibilities</span>!
          </h3>
        </div>
      </div>
    </main>
  );
}
export default App;