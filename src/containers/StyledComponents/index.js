import styled from "styled-components";

export const CellWrapper = styled.div`
  min-width: 120px;
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
export const EventListWrapper = styled("ul")`
  margin: 0;
  padding: 0;
  list-style: none;
`;

export const EventListItemWrapper = styled("li")`
  padding-left: 2px;
  padding-right: 2px;
  margin-bottom: 2px;
  display: flex;
`;

export const EventItemWrapper = styled("button")`
  position: relative;
  flex-grow: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 114px;
  border: unset;
  color: #dddddd;
  cursor: pointer;
  margin: 0;
  padding: 0;
  text-align: left;
  background-color: #5d5f63;
  border: 1px solid #5d5f63;
  border-radius: 2px;
`;
