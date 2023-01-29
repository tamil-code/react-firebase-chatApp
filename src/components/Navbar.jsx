import { Avatar, Button } from '@mui/material'
import React from 'react'
import {signOut} from 'firebase/auth'
import { auth } from '../Firebase/firebase'
import {useDispatch,useSelector} from 'react-redux'
import {Authactions}  from '../store/redux-store'
import {useNavigate} from 'react-router-dom'
const Navbar = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const user = useSelector(state=>state.auth.currentUser);
    return (
        <div style={{ height: '50px', background: '#2f2d52',display:'flex', justifyContent:'space-between',alignItems:'center',padding:'10px 2px 10px 2px',color:'white' }}>
             <p style={{flex:'2',fontWeight:'bold',fontSize:'20px'}}>Tamil's chat</p>

             <div style={{display:'flex',justifyContent:'space-evenly',alignItems:'center',flex:'1'}}>
             <Avatar src={user.photoURL} sx={{width:40,height:40}}></Avatar>
             <span>{user.displayName}</span>
             </div>

             <Button variant='contained' style={{flex:'1',scale:'0.75',fontWeight:'bold',background:'#5d5b8d',color:'white'}} size='small'
             onClick={()=>{
                signOut(auth);
                dispatch(Authactions.Logout());
                navigate('/');
               
                
             }}>Logout</Button>
        </div>  
    )
}

export default Navbar