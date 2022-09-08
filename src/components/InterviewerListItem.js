import React from "react";
import classNames from "classnames";
import "components/InterviewerListItems.scss";

export default function InterviewerListItem(props) {
  let interviewerClasses = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });
  return (
    <li onClick={props.setInterviewer} className={interviewerClasses}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
