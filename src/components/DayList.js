import React from "react";
import DayListItem from "./DayListItem";


export default function DayList(props) {
  const days = props.days.map(dayObj => { 
     return (
      <DayListItem
        key={dayObj.id}
        selected={dayObj.name === props.day}
        setDay={props.setDay}
        {...dayObj}
      />
    )
  })
  return (
    <ul>
      {days}
    </ul>
  );
}