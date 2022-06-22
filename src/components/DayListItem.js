import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

// function to display how many spots are remaining in the day list
const formatSpots = spots => {
  if (!spots) {
    return `no spots remaining`;
  }

  if (spots === 1) {
    return `${spots} spot remaining`;
  }

  return `${spots} spots remaining`;
}

// component to display each day in the day list
export default function DayListItem(props) {
  const { spots, selected, name, setDay} = props;

  const availability = formatSpots(spots);

  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": selected,
    "day-list__item--full": spots === 0
  });

  return (
    <li 
    onClick={() => setDay(name)}
    data-testid="day"
    className={dayClass}>
      <h2 className="text--regular">{name}</h2> 
      <h3 className="text--light">{availability}</h3>
    </li>
  );
}