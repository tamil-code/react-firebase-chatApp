import React from 'react'
import {TextField} from '@mui/material'
import { useState } from 'react'
import { collection, query, where,getDocs} from "firebase/firestore";
import { db } from '../Firebase/firebase';
const Search = (props) => {
  const[userName,setUsername] = useState("");
  const[err,setErr] = useState(false);
  const searchHandler = async()=>{
   try{
    const q = query(collection(db, "users"), where("displayName", "==", userName));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        if(doc.exists()){
            console.log(doc.data());
            props.onSearch(doc.data());
        }
    })
      setUsername("");
 
   }catch(err){
      setErr(err);
   }

  }
  const handleKey = (e)=>{
    if(e.code==='Enter'){
      searchHandler();
    }
  }
 
  return (
    <div>
      {/* <input type="text" name='text' style={{background:'transparent',outline:'none',border:'none',borderBottom:'1px solid white'}} placeholder='find a user'  /> */}
      <TextField id="standard-basic"  placeholder='find a user'   sx={{width:'75%'}} variant="standard"
       onChange={e=>setUsername(e.target.value)}
       onKeyDown ={e=>handleKey(e)}
       value={userName}
      />
    </div>
  )
}

export default Search