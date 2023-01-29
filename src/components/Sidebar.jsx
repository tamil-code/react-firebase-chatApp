import React from 'react'
import { useState } from 'react'
import Navbar from './Navbar'
import Search from './Search'
import styles from './sidebar.module.css'
import UserProfiles from './UserProfiles'

const Sidebar = () => {
  const[user,setUser] = useState(null);
  const handlesearch = (user)=>{
    console.log(user);
       setUser(user);
  }
  const closeSearch = ()=>{
    setUser(null);
  }
  return (
    <div className={styles.sidebar} style={{flex:'1'}}>
      <Navbar/>
      <Search onSearch = {handlesearch} />
      <UserProfiles prof = {user} closeSearch={closeSearch}/>

      </div>
  )
}

export default Sidebar