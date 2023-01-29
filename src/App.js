
import './App.css';
//import Chats from './components/Chats';
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Chats from './components/Chats';
import { useSelector } from 'react-redux';



function App() {
  const currentUser = useSelector(state=>state.auth.currentUser);
  const ProtectedRoute = ({children})=>{
    if(!currentUser.uid){
      return <Navigate to='/'></Navigate>
    }
    return children;
  }
 
  return (
    <div className="App">
       <BrowserRouter>
         <Routes>
             <Route path='/' element={<Login/>}></Route>
             <Route path='/signup' element={<Register/>}></Route>
             <Route path='/chats' element={ <ProtectedRoute><Chats/></ProtectedRoute>}></Route>
         </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
