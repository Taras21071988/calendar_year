import React from "react";
import moment from "moment";
import { CellWrapper, RowCell } from "../../containers/StyledComponents";

export const CalendarGridHeader = () => (
  <>
    {[...Array(7)].map((_, i) => (
      <CellWrapper key={i} $isheader $isselectedmonth>
        <RowCell $justifycontent={"flex-end"} $pr={1}>
          {moment()
            .day(i + 1)
            .format("ddd")}
        </RowCell>
      </CellWrapper>
    ))}
  </>
);
