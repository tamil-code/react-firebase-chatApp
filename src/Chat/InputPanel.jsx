import { Button } from '@mui/material';
import React from 'react'
import {Send} from '@mui/icons-material'
import './inputpanel.css';
import { useState } from 'react';
import { serverTimestamp, Timestamp } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { Chatcontext } from '../store/ChatContextProvider';
import { arrayUnion, doc,updateDoc} from 'firebase/firestore';
import {v4 as uuid} from 'uuid'
import {db, storage } from '../Firebase/firebase';
import { getDownloadURL,uploadBytesResumable ,ref} from 'firebase/storage';
const InputPanel = () => {
  const[text,setText] = useState("");
  const[img,setImg] = useState(null);
  const currentUser = useSelector(state=>state.auth.currentUser);
  const {data} = useContext(Chatcontext);
  const handlersend = async()=>{
     if(img){
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);
      uploadTask.on(
        (error)=>{
          console.log(error);
        },
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
             await updateDoc(doc(db,"chats",data.chatId), {
              messages:arrayUnion({
                id:uuid(),
                text,
                senderId:currentUser.uid,
                date:Timestamp.now(),
                img:downloadURL
              })
        });
          });
        }
      )
     }  
     else{
      await updateDoc(doc(db,"chats",data.chatId), {
        messages:arrayUnion({
          id:uuid(),
          text,
          senderId:currentUser.uid,
          date:Timestamp.now()
        })
  });
     }
     await updateDoc(doc(db,"userChats",currentUser.uid),{
      [data.chatId+".lastMessage"]:{
        text,
      },
      [data.chatId+".date"]:serverTimestamp() 
     })
     await updateDoc(doc(db,"userChats",data.user.uid),{
      [data.chatId+".lastMessage"]:{
        text,
      },
      [data.chatId+".date"]:serverTimestamp()
     })

     setText("");
     setImg(null);
  }
  const handleEnter = (e)=>{
      if(e.code=='Enter' && text.trim()!=''){
        handlersend();
      }
  }  
  return (
    <div className='wrapper'>
      <input type="text" name="chat" placeholder='Type Something...' className='input'  onChange={e=>setText(e.target.value)} value={text} onKeyDown={handleEnter}/>
      <div className="input-icons">
        <input type="file" id="file"  style={{display:'none'}} onChange={e=>setImg(e.target.files[0])}/>
        <label htmlFor="file">
          <img src="./images/img.png" style={{cursor:'pointer'}}/>
        </label>
        </div>
      <Button variant='contained' color='secondary' size='small' style={{marginRight:'15px'}}  onClick={handlersend} endIcon={<Send/>}>send</Button>
    </div>
  )
}

export default InputPanel