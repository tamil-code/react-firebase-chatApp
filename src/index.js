import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import theme from './theme/theme';
import {ThemeProvider} from '@mui/material'
import {Provider} from 'react-redux'
import store from './store/redux-store';
import ChatContextProvider from './store/ChatContextProvider';

  
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ChatContextProvider>
     <ThemeProvider theme={theme}>
       <App />
     </ThemeProvider>
    </ChatContextProvider>  
  </Provider>
);


