import { Avatar } from '@mui/material'
import React,{useEffect} from 'react'
import profstyles from './profile.module.css'

const Profile = (props) => {
  let content = <span>no prof found</span>;

 

  if(props.onclick){
    content = <div className={profstyles['profile-card']} onClick={()=>{
         props.onclick()
      }}>
        <Avatar src={props.img}></Avatar>
        <span>{props.name}</span>
        <span>{props.name}</span>
    </div>  
  }
  else{
    content = (<div className={profstyles['profile-card']} onClick={()=>{props.onselect()}}>
    <Avatar src={props.img}></Avatar>
   <div className={profstyles.flex}>
   <span>{props.name}</span>
   <span className={profstyles.lastMessage}>{props.lastMessage?.text}</span>  
   </div>
  </div>);
  }
  

 

  return (
   <>
    {content}
   </>
  )
}

export default Profile