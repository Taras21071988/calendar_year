import React from "react";
import { isDayContainCurrentEvent } from "../../helpers";
import { CalendarCell } from "../CalendarCell";

export const MonthDayList = ({
  startDay,
  totalDay,
  events,
  openFormHandler,
  today,
  setDisplayMode
}) => {
  const day = startDay.clone().subtract(1, "day");
  const daysArray = [...Array(totalDay)].map(() => day.add(1, "day").clone());
  return daysArray.map((dayItem, i) => (
    <CalendarCell
      key={i}
      today={today}
      events={events.filter((event) =>
        isDayContainCurrentEvent(event, dayItem)
      )}
      openFormHandler={openFormHandler}
      dayItem={dayItem}
      setDisplayMode={setDisplayMode}
    />
  ));
};
