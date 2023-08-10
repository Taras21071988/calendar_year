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
`;

const CalendarGrid = ({ startDay }) => {
  //   const totalDays = 42;
  const day = startDay.clone().subtract(1, "day");
  const daysArray = [...Array(42)].map(() => day.add(1, "day").clone());

  console.log(daysArray);
  return (
    <GridWrapper>
      {daysArray.map((dayItem) => (
        <CellWrapper
          key={dayItem.format("DDMMYYYY")}
          $isweekend={dayItem.day() === 6 || dayItem.day() === 0}
        >
          <RowCell $justifycontent={"flex-end"}>
            <DayWrapper>{dayItem.format("D")}</DayWrapper>
          </RowCell>
        </CellWrapper>
      ))}
    </GridWrapper>
  );
};

export { CalendarGrid };
