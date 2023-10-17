import React, { useState, useRef, useEffect } from 'react';
import '../../Chat.css';
import * as StompJs from "@stomp/stompjs";
import * as SockJS from "sockjs-client";

const ROOM_SEQ = 1;
const ShowChat = () => {

    const [message, setMessage] = useState("");
    const innerRef = useRef(null);
    const client = useRef({});
    const [chatMessage, setChatMessage] = useState([]);

    useEffect(() => {
        if (innerRef.current) {
            innerRef.current.scrollTo(0, innerRef.current.scrollHeight);
        }

        connect();

        return () => disconnect();

    }, []);


    const disconnect = () => {
        client.current.deactivate();
    };

    const subscribe = () => {
        client.current.subscribe(`/sub/chat/${ROOM_SEQ}`, ({ body }) => {
            setChatMessage((_chatMessage) => [..._chatMessage, JSON.parse(body)]);
        });
    };

    const publish = (message) => {
        if (!client.current.connected) {
            return;
        }

        client.current.publish({
            destination: "/pub/chat",
            body: JSON.stringify({ roomSeq: ROOM_SEQ, message }),
        });

        setMessage("");
    };

    const connect = () => {
        client.current = new StompJs.Client({
            // brokerURL: "ws://localhost:8080/ws-stomp/websocket", // 웹소켓 서버로 직접 접속
            webSocketFactory: () => new SockJS("/ws-stomp"), // proxy를 통한 접속
            connectHeaders: {
                "auth-token": "spring-chat-auth-token",
            },
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: () => {
                subscribe();
            },
            onStompError: (frame) => {
                console.error(frame);
            },
        });

        client.current.activate();
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && e.target.value.trim() !== '') {
            const newMessage = {
                content: e.target.value.trim(),
                time: currentTime(),
                isMine: e.target.classList.contains('mymsg'),
            };

            setMessage((prevMessage) => [...prevMessage, newMessage]);
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

            </div>

            <input className="mymsg"
                type={"text"}
                placeholder={"message"}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.which === 13 && publish(message)}
            />

            <input type="text" className="mymsg" placeholder="내용입력" onKeyPress={handleKeyPress}/>
            <input type="text" className="yourmsg" placeholder="내용입력" onKeyPress={handleKeyPress}/>
        </div>
    );
};

export default ShowChat;