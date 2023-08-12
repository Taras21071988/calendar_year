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

const CalendarGrid = ({ startDay, today, totalDay }) => {
  const day = startDay.clone().subtract(1, "day");
  const daysArray = [...Array(totalDay)].map(() => day.add(1, "day").clone());
  const isCurrentDay = (day) => moment().isSame(day, "day");
  const isSelectedMonth = (day) => today.isSame(day, "month");

  return (
    <>
      <GridWrapper $isheader>
        {[...Array(7)].map((_, i) => (
          <CellWrapper $isheader $isselectedmonth>
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
            key={dayItem.format("DDMMYYYY")}
            $isweekend={dayItem.day() === 6 || dayItem.day() === 0}
            $isselectedmonth={isSelectedMonth(dayItem)}
          >
            <RowCell $justifycontent={"flex-end"}>
              <DayWrapper>
                {!isCurrentDay(dayItem) && dayItem.format("D")}
                {isCurrentDay(dayItem) && (
                  <CurrentDay>{dayItem.format("D")}</CurrentDay>
                )}
              </DayWrapper>
            </RowCell>
          </CellWrapper>
        ))}
      </GridWrapper>
    </>
  );
};

export { CalendarGrid };
