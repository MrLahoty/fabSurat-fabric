import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import './NewsletterPopup.css';

const NewsletterPopup = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [placeholderText, setPlaceholderText] = useState('');
    const [textIndex, setTextIndex] = useState(0);
    const [fullText, setFullText] = useState('Your email address...');
    const [charIndex, setCharIndex] = useState(0);

    const placeholderOptions = useMemo(() => [
        'Your email address...',
    ], []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCharIndex((prevCharIndex) => {
                const newCharIndex = (prevCharIndex + 1) % (fullText.length + 1);
                if (newCharIndex === 0) {
                    setTextIndex((prevTextIndex) => (prevTextIndex + 1) % placeholderOptions.length);
                    setFullText(placeholderOptions[(textIndex + 1) % placeholderOptions.length]);
                }
                return newCharIndex;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [charIndex, fullText, textIndex, placeholderOptions]);

    useEffect(() => {
        setPlaceholderText(fullText.substring(0, charIndex));
    }, [charIndex, fullText]);

    useEffect(() => {
        const lastPopupTime = localStorage.getItem('popupLastShown');
        const currentTime = new Date().getTime();
        const oneDay = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

        if (!lastPopupTime || currentTime - lastPopupTime > oneDay) {
            const timer = setTimeout(() => {
                setShowPopup(true);
                localStorage.setItem('popupLastShown', currentTime.toString()); // Store current time
            }, 1000); // Popup will appear after 1 second

            return () => clearTimeout(timer);
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate email format before sending to backend
        const validateEmail = (email) => {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        };

        if (!validateEmail(email)) {
            setMessage('Please enter a valid email address.');
            setMessageType('error');
            return;
        }

        try {
            const { data } = await axios.post('/api/v1/subscribers/subscribe', { email });
            setMessage(data.msg);
            setMessageType('success'); // Set message type to success
            setEmail('');
        } catch ({ response }) {
            setMessage(response?.data?.msg || 'An error occurred');
            setMessageType('error'); // Set message type to error
        }
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <>
            {showPopup && (
                <div className="popup-container">
                    <div className="popup-content">
                        <button className="close-button" onClick={closePopup}>
                            &times;
                        </button>
                        <h2>Subscribe to receive exciting offers!</h2>
                        <p>Stay updated with our latest offers and products</p>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder={placeholderText}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button type="submit">Subscribe</button>
                        </form>
                        {message && (
                            <p className={`message ${messageType}`}>{message}</p>
                        )}

                        <div className="social-icons">
                            <a href="https://chat.whatsapp.com/CNHjXO1ZgLODaQcHMStFFk" target="_blank" rel="noopener noreferrer" className="social-icon">
                                <i className="fab fa-whatsapp"></i>
                            </a>
                            <a href="https://instagram.com/fabsurat_fabric" target="_blank" rel="noopener noreferrer" className="social-icon">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default NewsletterPopup;
