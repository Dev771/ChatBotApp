import React from 'react'
import chatbot from '../../../img/chatbot.png';

const ChatPop = ({ author, msg }) => {

  //Spliting The Messages in Case of Line Breaks
  const finalMessage = msg.split("\n");

  return (
    <>
      {
        author ===  'Loading' ? (
          <div className="chat">
            <img src={chatbot} alt='C' />
            <div className='LoadingMsg'>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
          <div className={author === 'bot' ? 'chat' : 'chat chatUser'}>
            <img src={chatbot} alt='C' />
            <div style={{ display: 'block' }}>{ finalMessage.map((a, i) => (
              <div key={i}>{a}</div>
            )) }</div>
          </div>
        )
      }
      
    </>
  )
}

export default ChatPop