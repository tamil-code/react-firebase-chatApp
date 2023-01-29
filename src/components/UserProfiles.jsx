import React, { useContext, useEffect, useState } from 'react'
import Profile from './Profile'
import { useSelector } from 'react-redux'
import { doc, getDoc, serverTimestamp, setDoc, updateDoc,onSnapshot } from 'firebase/firestore';
import { db } from '../Firebase/firebase';

import { Chatcontext } from '../store/ChatContextProvider';
const UserProfiles = ({prof,closeSearch}) => {
  const[chats,setChats] = useState([]);
  const  {dispatch} = useContext(Chatcontext);
  const currentUser = useSelector(state=>state.auth.currentUser);
  useEffect(()=>{
 
   
    if(currentUser && currentUser.uid){
         
          onSnapshot(doc(db, "userChats",currentUser.uid), (doc) => {
            if(doc.exists){
              setChats(doc.data());  
            }
           });
        }
         
      
   
  },[currentUser]) 

 
  const handlerclick = async()=>{
   
   
    const combinedId = currentUser.uid > prof.uid ? currentUser.uid+prof.uid :prof.uid +currentUser.uid;
    try{
       const res = await getDoc(doc(db,"chats",combinedId));
       if(!res.exists()){
        await setDoc(doc(db,"chats",combinedId),{messages:[]});

        //update the userChats for currentuser
        await updateDoc(doc(db,"userChats",currentUser.uid),{
          [combinedId+".userInfo"]:{
            uid:prof.uid,
            displayName:prof.displayName,
            photoURL:prof.photoURL
          },
          [combinedId+'.date']:serverTimestamp(),
        })
        //update the userChat for opposite user
        await updateDoc(doc(db,"userChats",prof.uid),{
          [combinedId+".userInfo"]:{
            uid:currentUser.uid,
            displayName:currentUser.displayName,
            photoURL:currentUser.photoURL
          },
          [combinedId+'.date']:serverTimestamp(),
        })
       }
      dispatch({type:"CHANGE_USER",payload:prof});
      closeSearch();
    }catch(err){
       console.log(err);
    }
  }


 const handlerSelect = (userInfo)=>{
     dispatch({type:"CHANGE_USER",payload:userInfo});
 }
  return (
    <div>
      {prof && <Profile img={prof.photoURL} name= {prof.displayName} onclick={handlerclick}/>}
      {chats && Object.entries(chats)?.sort((a,b)=>b[1].date-a[1].date).map((chat)=>{return <Profile key = {chat[0]} name={chat[1].userInfo.displayName } img={chat[1].userInfo.photoURL} onselect={()=>{handlerSelect(chat[1].userInfo)}} lastMessage={chat[1].lastMessage}/>})}
    </div> 
  )  
}

export default UserProfiles