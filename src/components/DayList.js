import React from "react";
import DayListItem from "./DayListItem";

// daylist component displays the list of days on the side pane
export default function DayList(props) {
  const { value, onChange } = props;

  const days = props.days.map(day => {
    return (
      <DayListItem
        key={day.id} 
        name={day.name} 
        spots={day.spots} 
        selected={day.name === value}
        setDay={onChange}
      />
    );
  });

  return (
    <ul>
      {days}
    </ul>
  );
}