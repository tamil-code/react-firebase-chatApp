import styles from './Register.module.css'
import {TextField,Button,styled,Alert} from '@mui/material';
import {useNavigate} from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase/firebase';
import { Authactions } from '../store/redux-store';
import { useState } from 'react';
import {useDispatch} from 'react-redux'
const Login = () => {
  const navigate =useNavigate();
  const dispatch = useDispatch();
  const[err,seterr] = useState('');
  const[errstate,setErrstate] = useState(false);
  const StyledInput = styled(TextField)({
    marginBottom:'0px',
    width:'75%',
    margin:'auto',
    color:'secondary',
  })
  
  const loginHandler = (e)=>{
    e.preventDefault();
   const email = e.target[0].value;
   const password = e.target[1].value;
   signInWithEmailAndPassword(auth, email, password)
     .then((userCredential) => {
      
       let user = userCredential.user;
       dispatch(Authactions.Login(user));
       navigate('/chats');
       
     })
     .catch((error) => {
       setErrstate(true);
       const errorMessage = error.message;
       seterr(errorMessage);
       setTimeout(() => {
        setErrstate(false);
       }, 3000);
     });
  }
  return (
    <div className={styles['form-container']}  style={{display:'flex',gap:'20px',flexDirection:'column'}}>
    <form className={styles["form-wrapper"]} style={{height:'50%',width:'30%'}} onSubmit={loginHandler}>
         <span className={styles['logo']}>Tamil's chat app</span>
         <span className={styles['title']}>Login</span>
         <StyledInput type="email" label="email" variant="standard" />
         <StyledInput label="Password" type="password" variant="standard" />
         <Button variant="contained"  sx={{margin:'15px auto 10px auto',width:'50%'}} type='submit'>Login</Button>
         <p className='para'>You dont have an account <span className='login'><span style={{color:'blue',textDecoration:'underline',cursor:'pointer'}} onClick={()=>{navigate('/signup')}}>signup</span></span></p>
         
     </form>
     {errstate && <Alert severity="error">{err}</Alert>}
</div>
  )
}

export default Login