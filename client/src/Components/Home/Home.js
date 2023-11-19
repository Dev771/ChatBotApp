import React, { useEffect, useRef, useState } from 'react';
import "./Home.css";
import rightArrow from '../../img/right-arrow.png'
import ChatPop from './ChatPop/ChatPop';
import * as api from '../../api/index';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
const socket = io.connect("http://localhost:3000");

const Home = () => {

    const [text, setText] = useState("");
    const [convo, setConvo] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const div = useRef(null);

    const findRecords = async() => {
        const data = await api.getAllChats(JSON.parse(localStorage.getItem("User")).email);

        localStorage.setItem("convo", JSON.stringify(data.data.data));

        setConvo(data.data.data);
    }

    useEffect(() => {
        if(localStorage.getItem("logged")) {
            if(!localStorage.getItem("convo")) {
                findRecords();
            } else {
                setConvo(JSON.parse(localStorage.getItem("convo")));
            }
    
            window.addEventListener("convo", () => {
                setConvo(JSON.parse(localStorage.getItem("convo")));
            })
    
            socket.on("bot_Response", (data) => {
                setLoading(false);
                findRecords();
            })
        } else {
            navigate("/login");
        }
    }, [navigate])

    useEffect(() => {
        div.current.scrollIntoView({ behavior: "smooth", block: "end" })
    }, [convo])


    const handleSubmit = async (e) => {
        e.preventDefault();
        const userEmail = JSON.parse(localStorage.getItem("User")).email;
        
        const conversation = JSON.parse(localStorage.getItem("convo"));
        conversation.push({ message: text, user:  userEmail, respondent: false, createdAt: Date.now()})
        
        localStorage.setItem("convo", JSON.stringify(conversation));

        window.dispatchEvent(new Event("convo"));

        const userMessage = text;

        setText("");
        setLoading(true);

        socket.emit("UserMessage", { message: userMessage, email: userEmail});
    }



    return (
        <div className='home-container'>
            <h1 className='heading'>
                ChatBot
            </h1>
            <div className='chatArea'>
                {
                    convo.map((a, i) => (
                        <ChatPop key={i} author={a.respondent ? "bot" : "user"} msg={a.message} />
                    )) 
                }
                {
                    loading ? (
                        <ChatPop author="Loading" msg="" />
                    ) : (<></>)
                }
                <div ref={div}></div>
            </div>
            <form className='textArea' onSubmit={handleSubmit}>
                <input type='text' placeholder={loading ? 'Please Wait for the Response' : 'Chat Here....'} value={text} readOnly={loading ? true : false} onChange={(e) => setText(e.target.value)} required />
                <button type='submit'>
                    <img src={rightArrow} alt='Submit' />
                </button>
            </form>
        </div>
    )
}

export default Home;