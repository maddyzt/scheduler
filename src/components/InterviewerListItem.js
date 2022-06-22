import React from 'react';
import "components/InterviewerListItem.scss";
import classNames from "classnames";

// interviewer list item formats each individual interviewer
export default function InterviewerListItem(props) {
  const { setInterviewer, avatar, name, selected } = props;

  const interviewersClass = classNames(
    "interviewers__item", 
    {"interviewers__item--selected": selected}
    );

  return (
  <li onClick={setInterviewer} className={interviewersClass}>
  <img
    className="interviewers__item-image"
    src={avatar}
    alt={name}
  />
  {selected && name}
</li>
);
}
