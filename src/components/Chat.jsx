import React from 'react'
import ChatBar from '../Chat/ChatBar'
import InputPanel from '../Chat/InputPanel'
import MessageSpace from '../Chat/MessageSpace'
import styles from './chat.module.css'
const Chat = () => {
  return (
    <div className={styles.chat} style={{flex:'2',display:'flex',flexDirection:'column',justifyContent:'space-between',alignItems:'center'}}>
        <ChatBar/>
        <MessageSpace/>
        <InputPanel/>
      </div>
  )
}

export default Chat