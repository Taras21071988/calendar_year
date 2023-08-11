import moment from "moment";
import React from "react";
import { styled } from "styled-components";

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(6, 1fr);
  background-color: #404040;
  grid-gap: 1px;
`;
const CellWrapper = styled.div`
  min-width: 140px;
  min-height: 80px;
  background-color: ${(props) => (props.$isweekend ? "#272829" : "#1e1f21")};
  color: #dddcdd;
`;
const RowCell = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.$justifycontent ? props.$justifycontent : "flex-start"};
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

const CalendarGrid = ({ startDay }) => {
  //   const totalDays = 42;
  const day = startDay.clone().subtract(1, "day");
  const daysArray = [...Array(42)].map(() => day.add(1, "day").clone());
  const isCurrentDay = (day) => moment().isSame(day,'day');

  return (
    <GridWrapper>
      {daysArray.map((dayItem) => (
        <CellWrapper
          key={dayItem.format("DDMMYYYY")}
          $isweekend={dayItem.day() === 6 || dayItem.day() === 0}
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
  );
};

export { CalendarGrid };
