import React from "react";
import classNames from "classnames";
import "components/Button.scss";

// button component which includes multiple styles
export default function Button(props) {
  const { confirm, danger, onClick, disabled, children } = props;

   const buttonClass = classNames("button", {
      "button--confirm": confirm,
      "button--danger": danger
    });
 
   return (
   <button 
   onClick={onClick} 
   disabled={disabled} 
   className={buttonClass}
   >
   {children}
   </button>
   );
 }
