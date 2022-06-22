import { useState } from 'react';

// exports mode, transition and back functions for transitioning between modes
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

