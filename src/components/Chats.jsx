import React, { useEffect } from 'react'
import Chat from './Chat'
import Sidebar from './Sidebar'
import styles from '../pages/Register.module.css'
import { Box, styled } from '@mui/material'
import {onAuthStateChanged} from 'firebase/auth'

import { auth } from '../Firebase/firebase'
import { Authactions } from '../store/redux-store'
import {useDispatch} from 'react-redux'


const Chats = () => {
  
  const dispatch = useDispatch();
  
  useEffect(()=>{
    
      onAuthStateChanged(auth,(user)=>{
        dispatch(Authactions.Login(user));
         
         
     })
    
   
  },[])
 
 
    const StyledContainer = styled(Box)({
        border:'1px solid white',
        borderRadius:'10px',
        display:'flex',
        width:'65%',
        height:'80%',
      overflow:'hidden'
        
    })
  return (
    <div className={styles['form-container']}>
       <StyledContainer>
           <Sidebar/>
            <Chat/>
       </StyledContainer>
    </div>
  )
}

export default Chats