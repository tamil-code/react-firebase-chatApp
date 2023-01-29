import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import '../Chat/Message.css'
const Message = ({message}) => {
  const ref = useRef();
  useEffect(()=>{
    ref.current?.scrollIntoView({behavior:"smooth"});
  },[message])
  const currentUser = useSelector(state=>state.auth.currentUser);
  return (
   <>
      <div className={`message ${message.senderId===currentUser.uid?'sent':'received'}`} ref={ref} >
       {message.text}
    </div>

    {message.img && <div className={`message ${message.senderId===currentUser.uid?'sent':'received'}`} ref={ref} >
       <img src={message.img} alt="this is an img" />
    </div>}
   </>
  )
}

export default Message