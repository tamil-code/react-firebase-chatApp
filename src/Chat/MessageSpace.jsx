import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext,useState,useEffect} from 'react'
import Message from '../components/Message'
import { db } from '../Firebase/firebase';
import { Chatcontext } from '../store/ChatContextProvider'
const MessageSpace = () => {
  const {data} = useContext(Chatcontext);
  const[messages,setMessages]=useState([]);
  useEffect(()=>{
    const unsub = onSnapshot(doc(db,"chats",data.chatId),(doc)=>{
       doc.exists() && setMessages(doc.data().messages)
    })
    return ()=>{
      unsub();
    }
  },[data])
  return (
    <div style={{  backgroundColor: "#efe7dd",width:'100%',flex:'9',overflow:'scroll'}}>
       {messages?.map((message)=>{return <Message message={message} key={message.id}/>})}
    </div>
  )
}

export default MessageSpace