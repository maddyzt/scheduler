import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss";

const formatSpots = spots => {
  if (!spots) {
    return `no spots remaining`;
  }

  if (spots === 1) {
    return `${spots} spot remaining`;
  }

  return `${spots} spots remaining`;
}

export default function DayListItem(props) {
  const availability = formatSpots(props.spots);

  const dayClass = classNames("day-list__item", {
    "--selected": props.selected,
    "--full": props.spots === 0
  });

  return (
    <li 
    onClick={() => props.setDay(props.name)}
    className={dayClass}>
      <h2 className="text--regular">{props.name} Name</h2> 
      <h3 className="text--light">{availability}</h3>
    </li>
  );
}