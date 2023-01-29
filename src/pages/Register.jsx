import styles from './Register.module.css'
import { TextField, Button, styled ,Alert,Snackbar} from '@mui/material';
import { createUserWithEmailAndPassword,updateProfile} from "firebase/auth";
import { auth, storage,db} from '../Firebase/firebase';
import { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {useNavigate} from 'react-router-dom'
import { doc, setDoc } from "firebase/firestore"; 


const Register = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const[progress,setProgress] = useState(false);

  const[success,setSucess] = useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  // const handleClick = ()=>{

  //   const obj ={
  //     open: true,
  //     vertical: 'top',
  //     horizontal: 'center',
  //   }
  //   setSucess(obj);
  // }
  const handleClose = ()=>{
    const obj ={
      open: false,
      vertical: 'top',
      horizontal: 'center',
    }
    setSucess(obj);
  }
  const StyledInput = styled(TextField)({
    marginBottom: '15px',
    width: '75%',
    margin: 'auto',
    color: 'secondary',
  })

  const submitHandler =  (e) => {
    setProgress(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const image = e.target[3].files[0];
    try {
      createUserWithEmailAndPassword(auth, email, password).then((userCredentials)=>{
        const user = userCredentials.user;
        const storageRef = ref(storage, displayName);

        uploadBytes(storageRef, image).then(() => {
          getDownloadURL(storageRef)
          .then(
            (url) => {
              console.log(url);
             updateProfile(user, { 
                displayName,
                photoURL: url
              }).catch(err=>err)
            setDoc(doc(db, "users",user.uid ), {
                         uid:user.uid,
                         displayName,
                         email,
                         photoURL:url,
                         
                       }).catch(err=>err);
                setDoc(doc(db, "userChats", user.uid), {}).catch(err=>console.log(err));
                       
                    
                const obj ={
                  open: true,
                  vertical: 'top',
                  horizontal: 'center',
                }
                setSucess(obj);
               
              setProgress(false);
               navigate('/');
            }
          ).catch(err => { console.log(err) })
  
        }).catch(err => { console.log(err) })

      })

      //uploading image and update profile


     

      // uploadTask.on('state_changed',
      //   (error) => {
      //     setErr(true);
      //   },
      //   () => {
      //     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      //      console.log(downloadURL);
      //        updateProfile(res.user, {
      //         displayName,
      //         photoURL: downloadURL
      //       })
      //       // Add a new document in collection "cities"
      //       setDoc(doc(db, "users", res.user.uid), {
      //         uid:res.user.uid,
      //         displayName,
      //         email,
      //         photoURL:downloadURL,
               
      //       });
      //        setDoc(doc(db, "userChats", res.user.uid), {});
      //       console.log(downloadURL);
      //     });
      //   }
      // );

    
    }
    catch (error) {
          setErr(err);
    }
  }
  return (
    <div className={styles['form-container']}>
      <form className={styles["form-wrapper"]} onSubmit={submitHandler}>
        <span className={styles['logo']}>Tamil's chat app</span>
        <span className={styles['title']}>Register</span>
        <StyledInput  label="Username" variant="standard" type='text' />
        <StyledInput  label="email" variant="standard" type='email' />
        <StyledInput label="Password" variant="standard" type='password' />
        <input type="file" name="upload file" id="file" className={styles['input']} />
        <label htmlFor="file" className={styles['label']}>
          <img src="./images/addAvatar.png" alt="" />
          add an avatar</label>
        <Button variant="contained" sx={{ margin: '15px auto 10px auto', width: '50%' }} type='submit'>{progress?'signing up...':'Sign up'}</Button>
        <p className='para'>You already have an account <span className='login'><span  style={{color:'blue',textDecoration:'underline',cursor:'pointer'}} onClick={()=>{navigate('/')}}>login</span></span></p>

      </form>
      {err && <span>{errMsg}</span>}
      {/* <Button variant="contained" onClick={handleClick}>
            Open success snackbar
      </Button> */}
      <Snackbar open={success.open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical:'top',horizontal:'center'}} >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
           signIn successful !
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Register