// When transition is called, we need to add the new mode to our history.
// When back is called, we should set the mode to the previous item in our history array.


import React, { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  const transition = (newMode, replace = false) => {
    if(replace){
      setHistory(prev => prev.slice(0, -1));
      setHistory(prev => [...prev, newMode]);
      }else{
        setHistory(prev => [...prev, newMode]); 
      }
      setMode(newMode);
  }

  const back = () => {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);    
    }
  };

  return { mode, transition, back }
};

