import React from "react";
import DayListItem from "./DayListItem";

export default function DayList(props) {
  const days = props.days;
  const day = days.map((d) => {
    return (
      <DayListItem
        key={d.id}
        name={d.name}
        spots={d.spots}
        setDay={props.onChange}
        selected={d.name === props.value}
      />
    ) 
  });

  return <ul>{day}</ul>;
}
