import React, { useState, useRef, useEffect, ChangeEvent, FormEvent } from 'react';
import ContactSection from '../components/ContactSection';
import UpArrow from '../assets/arrow.svg';
import '../styles/agentn.css';

const AgentN: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        adjustTextareaHeight();
    }, [inputValue]);

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setInputValue(e.target.value);
        adjustTextareaHeight();
    };

    const adjustTextareaHeight = () => {
        const textarea = inputRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
            
            if (textarea.value.length === 0) {
                textarea.style.height = '50px'; 
            }
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Submitted:', inputValue);
        setInputValue('');
        if (inputRef.current) {
            inputRef.current.style.height = '50px'; 
        }
    };

    return (
        <div className="agentn-page">
            <div className="main-box">
                <div className="white-box">
                    <form onSubmit={handleSubmit} className="input-container">
                        <textarea
                            ref={inputRef}
                            className="message-input"
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="Message Agent N..."
                            rows={1}
                        />
                        <button
                            type="submit"
                            className={`send-button ${!inputValue.trim() ? 'hidden' : ''}`}
                            disabled={!inputValue.trim()}
                        >
                           <img src={UpArrow} alt="Send" className="arrow-icon" />
                        </button>
                    </form>
                </div>
            </div>
            <ContactSection />
        </div>
    );
};

export default AgentN;