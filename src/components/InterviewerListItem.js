import React from 'react';
import "components/InterviewerListItem.scss";
import classNames from "classnames";


export default function InterviewerListItem() {

  const interviewersClass = classNames(
    "interviewers__item", 
    {"--selected": props.selected}
    );

  return (
  <li onClick={() => props.setInterviewer(props.id)} className={interviewersClass}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {props.selected && props.name}
</li>
);
}