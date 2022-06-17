// When transition is called, we need to add the new mode to our history.
// When back is called, we should set the mode to the previous item in our history array.


import React, { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);


  const transition = (mode, replace = false) => {
    if (!replace) {
      setMode(mode);
      history.push(mode);
    } else {
    setMode(mode);
    }  
  };

  const back = () => {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);    
    }
  };

  return { mode, transition, back }
};
