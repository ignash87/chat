import React, {useEffect} from 'react';
import './App.css';
import RouterApp from "./components/RouterApp";
import {useDispatch} from "react-redux";
import {getInitialUser} from "./store/rootReducer";

function App() {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getInitialUser())
  }, [])
  return (
      <RouterApp />
  );
}

export default App;
