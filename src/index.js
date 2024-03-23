import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
import { ChakraProvider } from "@chakra-ui/react"
import { Provider } from 'react-redux'; //ek api hai 
import store from './redux/store/store';
import MyRoutes from './Routes/Routes';
const domain ="dev-rdq1ubcmwqrxebw0.us.auth0.com";
const clientId ="8Qgqguo4pbhRyeGp9wWLQSYZB9Y4H5Nr"

        
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <Provider store={store}>
     <ChakraProvider>
        <App />
       
      </ChakraProvider>
      </Provider>
   
  
   
  </React.StrictMode>
);


