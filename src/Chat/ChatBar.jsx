import React, { useContext } from 'react'
import { Chatcontext } from '../store/ChatContextProvider'
import { Avatar } from '@mui/material';
const ChatBar = () => {
  const {data} = useContext(Chatcontext);
  return (
    <div style={{width:'100%',flex:'1',background: '#2f2d52',color:'white',display:'flex',justifyContent:'flex-start',alignItems:'center'}}>
        {data.user.photoURL &&  <Avatar src={data.user?.photoURL} sx={{marginLeft:'10px'}}></Avatar>}
        <span style={{marginLeft:'20px'}}>{data.user?.displayName}</span>
    </div>
  )
}

export default ChatBar