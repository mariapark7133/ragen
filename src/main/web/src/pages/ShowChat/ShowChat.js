import React, { useState, useRef, useEffect } from 'react';
import '../../Chat.css';

const ShowChat = () => {
    const [messages, setMessages] = useState([]);
    const innerRef = useRef(null);

    useEffect(() => {
        if (innerRef.current) {
            innerRef.current.scrollTo(0, innerRef.current.scrollHeight);
        }
    }, [messages]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && e.target.value.trim() !== '') {
            const newMessage = {
                content: e.target.value.trim(),
                time: currentTime(),
                isMine: e.target.classList.contains('mymsg'),
            };

            setMessages((prevMessages) => [...prevMessages, newMessage]);
            e.target.value = '';
        }
    };

    const currentTime = () => {
        const date = new Date();
        const hh = date.getHours();
        const mm = date.getMinutes();
        const apm = hh > 12 ? '오후' : '오전';
        return `${apm} ${hh}:${mm}`;
    };

    return (
        <div className="chat_wrap">
            <div className="inner" ref={innerRef}>
                {messages.map((message, index) => (
                    <div className={`item ${message.isMine ? 'mymsg' : ''}`} key={index}>
                        <div className="box">
                            <p className="msg">{message.content}</p>
                            <span className="time">{message.time}</span>
                        </div>
                    </div>
                ))}
            </div>
            <input type="text" className="mymsg" placeholder="내용입력" onKeyPress={handleKeyPress}/>
            <input type="text" className="yourmsg" placeholder="내용입력" onKeyPress={handleKeyPress}/>
        </div>
    );
};

export default ShowChat;