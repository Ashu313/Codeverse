import './App.css';
import React, {  useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Home from './qui-component/pages/Home';
import Topic from './qui-component/pages/Topic';
import Header from './components/Header';

const ThemeContext = React.createContext()

export default function App() {
  const[theme, setTheme] = useState(true)
  const[topic, setTopic] = useState()
  const data = require('./data.json');

  const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/topic/:id",
    element: <Topic />,
  },
]);


const settheme = () => {
  setTheme(pre=>!pre)
}

  
  return (
    <>
     <ThemeContext.Provider value={{theme,settheme,data,setTopic}}>
      <Header id={topic}/> 
     <RouterProvider router={router} />
     </ThemeContext.Provider>
    </>
      
  );
}

export {ThemeContext}

