import React from "react";
import { CellWrapper, RowCell } from "../../containers/StyledComponents";
import styled from "styled-components";
import { isCurrentDay, isSelectedMonth } from "../../helpers";

const DayWrapper = styled.div`
  height: 33px;
  width: 33px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2px;
  cursor: pointer;
`;
const CurrentDay = styled.div`
  height: 100%;
  width: 100%;
  background: #f00;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ShowDayWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const EventListWrapper = styled.ul`
  margin: unset;
  list-style-position: inside;
  padding-left: 4px;
`;

const EventItemWrapper = styled.button`
  position: relative;
  left: -14px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 114px;
  border: unset;
  background: unset;
  color: #dddddd;
  cursor: pointer;
  margin: 0;
  padding: 0;
  text-align: left;
`;

export const MonthDayList = ({
  startDay,
  totalDay,
  events,
  openFormHandler,
  today,
}) => {
  const day = startDay.clone().subtract(1, "day");
  const daysArray = [...Array(totalDay)].map(() => day.add(1, "day").clone());
  return (
    <>
      {daysArray.map((dayItem) => (
        <CellWrapper
          key={dayItem.unix()}
          $isweekend={dayItem.day() === 6 || dayItem.day() === 0}
          $isselectedmonth={isSelectedMonth(dayItem, today)}
        >
          <RowCell $justifycontent={"flex-end"}>
            <ShowDayWrapper>
              <DayWrapper
                onDoubleClick={() => openFormHandler("Create", null, dayItem)}
              >
                {isCurrentDay(dayItem) ? (
                  <CurrentDay>{dayItem.format("D")}</CurrentDay>
                ) : (
                  dayItem.format("D")
                )}
              </DayWrapper>
            </ShowDayWrapper>
            <EventListWrapper>
              {events
                .filter(
                  (event) =>
                    event.date >= dayItem.format("X") &&
                    event.date <= dayItem.clone().endOf("day").format("X")
                )
                .map((event) => (
                  <li key={event.id}>
                    <EventItemWrapper
                      onDoubleClick={() => openFormHandler("Update", event)}
                    >
                      {event.title}
                    </EventItemWrapper>
                  </li>
                ))}
            </EventListWrapper>
          </RowCell>
        </CellWrapper>
      ))}
    </>
  );
};
