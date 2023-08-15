import styled from "styled-components";

export const CellWrapper = styled.div`
  min-width: 140px;
  min-height: ${(props) => (props.$isheader ? 24 : 94)}px;
  background-color: ${(props) => (props.$isweekend ? "#272829" : "#1e1f21")};
  color: ${(props) => (props.$isselectedmonth ? "#dddddd" : "#555759")};
`;
export const RowCell = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${(props) =>
    props.$justifycontent ? props.$justifycontent : "flex-start"};
  ${(props) => props.$pr && `padding-right: ${props.$pr * 8}px`}
`;
