import React from "react";
import { styled } from "styled-components";
import { CalendarGridHeader } from "../CalendarGridHeader";
import { MonthDayList } from "../MonthDaysList";

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: ${(props) => (props.$isheader ? "#1e1f21" : "#404040")};
  ${(props) => props.$isheader && "border-bottom: 1px solid #404040"};
  grid-gap: 1px;
`;

const CalendarGrid = ({
  startDay,
  today,
  totalDay,
  events,
  openFormHandler,
  setDisplayMode
}) => {
  return (
    <>
      <GridWrapper $isheader>
        <CalendarGridHeader />
      </GridWrapper>
      <GridWrapper>
        <MonthDayList
          totalDay={totalDay}
          openFormHandler={openFormHandler}
          events={events}
          startDay={startDay}
          today={today}
          setDisplayMode={setDisplayMode}
        />
      </GridWrapper>
    </>
  );
};

export { CalendarGrid };
