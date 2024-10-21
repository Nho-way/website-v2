import React, { useState, useEffect } from 'react';
import profile from '../assets/nick.jpg';
import BoidSimulation from '../components/BoidSimulation';

import '../styles/personal.css';



const Personal: React.FC = () => {
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        const updateGreeting = () => {
            const currentHour = new Date().getHours();
            if (currentHour >= 5 && currentHour < 12) {
                setGreeting('Good Morning!');
            } else if (currentHour >= 12 && currentHour < 18) {
                setGreeting('Good Afternoon!');
            } else {
                setGreeting('Good Evening!');
            }
        };

        updateGreeting();
        const intervalId = setInterval(updateGreeting, 60000); 

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className = "personal-page">
            <div className="black-box">
                <div className="boid-container">
                    <BoidSimulation />
                </div>
                <div className="content-container">
                    <div className="profile">
                        <div className="profile-image">
                            <img src={profile} alt="Profile" />
                        </div>
                        <div className="profile-info">
                            <p>{greeting}</p>
                            <p>My name is Nicholas Ho. I'm currently a senior at UC San Diego, majoring in Computer Science. Most recently, I interned at Amazon Web Services. Previously, I TA'ed CSE 101, UCSD's advanced algorithms class, developed AI features and mobile apps for UCSD ITS, and created automation / data analytics tools at Riorey.</p>
                            <p>I love to learn, and I'm passionate about technology and solving problems with sustainable solutions. Reach out to talk about the possiblities!</p>
                        </div>
                    </div>
            </div>
            </div>    
        </div>
    );
}

export default Personal;