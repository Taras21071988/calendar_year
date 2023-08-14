import moment from "moment";
import React from "react";
import { styled } from "styled-components";

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: ${(props) => (props.$isheader ? "#1e1f21" : "#404040")};
  ${(props) => props.$isheader && "border-bottom: 1px solid #404040"};
  grid-gap: 1px;
`;
const CellWrapper = styled.div`
  min-width: 140px;
  min-height: ${(props) => (props.$isheader ? 24 : 80)}px;
  background-color: ${(props) => (props.$isweekend ? "#272829" : "#1e1f21")};
  color: ${(props) => (props.$isselectedmonth ? "#dddddd" : "#555759")};
`;
const RowCell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) =>
    props.$justifycontent ? props.$justifycontent : "flex-start"};
  ${(props) => props.$pr && `padding-right: ${props.$pr * 8}px`}
`;
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

const CalendarGrid = ({
  startDay,
  today,
  totalDay,
  events,
  openFormHandler,
}) => {
  const day = startDay.clone().subtract(1, "day");
  const daysArray = [...Array(totalDay)].map(() => day.add(1, "day").clone());
  const isCurrentDay = (day) => moment().isSame(day, "day");
  const isSelectedMonth = (day) => today.isSame(day, "month");

  return (
    <>
      <GridWrapper $isheader>
        {[...Array(7)].map((_, i) => (
          <CellWrapper key={i} $isheader $isselectedmonth>
            <RowCell $justifycontent={"flex-end"} $pr={1}>
              {moment()
                .day(i + 1)
                .format("ddd")}
            </RowCell>
          </CellWrapper>
        ))}
      </GridWrapper>
      <GridWrapper>
        {daysArray.map((dayItem) => (
          <CellWrapper
            key={dayItem.unix()}
            $isweekend={dayItem.day() === 6 || dayItem.day() === 0}
            $isselectedmonth={isSelectedMonth(dayItem)}
          >
            <RowCell $justifycontent={"flex-end"}>
              <ShowDayWrapper>
                <DayWrapper onDoubleClick={() => openFormHandler("Create")}>
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
      </GridWrapper>
    </>
  );
};

export { CalendarGrid };
