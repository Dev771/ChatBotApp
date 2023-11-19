import React, { useEffect, useRef, useState } from 'react';
import "./Home.css";
import rightArrow from '../../img/right-arrow.png'
import ChatPop from './ChatPop/ChatPop';
import * as api from '../../api/index';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
//Client Socket Io Connection
const socket = io.connect("http://localhost:3000");

const Home = () => {

    const [text, setText] = useState("");
    const [convo, setConvo] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const div = useRef(null);

    //Function to Fetch User Message Records from the MongoDb Server
    const findRecords = async() => {
        await api.getAllChats(JSON.parse(localStorage.getItem("User")).email)
            .then((data) => {
                localStorage.setItem("convo", JSON.stringify(data.data.data));
        
                setConvo(data.data.data);
            })
            .catch((error) => {
                setError(error.response.data.msg);
            });

    }

    useEffect(() => {
        //checks if user is logged or not
        if(localStorage.getItem("logged")) {
            //if logged gets all user messages
            if(!localStorage.getItem("convo")) {
                findRecords();
            } else {
                setConvo(JSON.parse(localStorage.getItem("convo")));
            }
    
            //Event Listener to add message in the State element whenever a new Message is recieved
            window.addEventListener("convo", () => {
                setConvo(JSON.parse(localStorage.getItem("convo")));
            })
    
            //Recieving Bot Response when the server emits it using Socket Io
            socket.on("bot_Response", (data) => {
                setLoading(false);
                findRecords();
            })
        } else {
            navigate("/login");
        }
    }, [navigate])

    //Refrencing to Last Chat
    useEffect(() => {
        div.current.scrollIntoView({ behavior: "smooth", block: "end" })
    }, [convo])

    //Function to send the User Query to The Server for The Open AI bot to process and Provide Response
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userEmail = JSON.parse(localStorage.getItem("User")).email;
        
        //Storing User message in the LocalStorage 
        const conversation = JSON.parse(localStorage.getItem("convo"));
        conversation.push({ message: text, user:  userEmail, respondent: false, createdAt: Date.now()})
        
        localStorage.setItem("convo", JSON.stringify(conversation));

        window.dispatchEvent(new Event("convo"));

        const userMessage = text;

        //Adding Loading Animation and Removing the text from the Text Bar
        setText("");
        setLoading(true);

        //Sending User Query to the Server
        socket.emit("UserMessage", { message: userMessage, email: userEmail});
    }



    return (
        <div className='home-container'>
            <div className='error' style={{ textAlign: 'center' }}>
                {error}
            </div>
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
            {/* Bottom Text Bar to Write For User */}
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