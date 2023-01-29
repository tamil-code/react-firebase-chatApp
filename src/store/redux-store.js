import {createSlice,configureStore} from '@reduxjs/toolkit'

const authState = createSlice({
    name:'authstate',
    initialState:{
        currentUser:{},
        userstate:false
    },
    reducers:{
       
       Login(state,action){
       
         if(action.payload){
            state.currentUser = action.payload;
            state.userstate = true;
           
         }
        
          
       },
       Logout(state){
         state.currentUser =null;
         
       }
       
    }
})


const store = configureStore({
    reducer:{
        auth:authState.reducer,
     
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
     
        ignoredActions: ['authstate/Login'],
     
        ignoredActionPaths: ['payload. Value'],
        
        ignoredPaths: ['auth.currentUser'], 
      }
    })
})



export default store;
export const Authactions = authState.actions;