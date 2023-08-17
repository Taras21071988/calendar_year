import React from "react";
import { isDayContainCurrentEvent } from "../../helpers";
import styled from "styled-components";
import {
  ButtonWrapper,
  ButtonsWrapper,
  EventBody,
  EventItemWrapper,
  EventListItemWrapper,
  EventListWrapper,
  EventTitle,
} from "../../containers/StyledComponents";

const DayShowWrapper = styled("div")`
  display: flex;
  flex-grow: 1;
`;

const EventsListWrapper = styled("div")`
  background-color: #1e1f21;
  color: #dddddd;
  flex-grow: 1;
`;

const EventFormWrapper = styled("div")`
  background-color: #27282a;
  color: #dddddd;
  width: 300px;
  position: relative;
`;
const NoEventMsg = styled("div")`
  color: #565759;
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
`;

export const DayShowComponents = ({
  events,
  today,
  selectedEvent,
  setEvent,

}) => {
  const eventList = events.filter((event) =>
    isDayContainCurrentEvent(event, today)
  );
  return (
    <DayShowWrapper>
      <EventsListWrapper>
        <EventListWrapper>
          {eventList.map((event) => (
            <EventListItemWrapper key={event.id}>
              <EventItemWrapper onClick={() => setEvent(event)}>
                {event.title}
              </EventItemWrapper>
            </EventListItemWrapper>
          ))}
        </EventListWrapper>
      </EventsListWrapper>
      <EventFormWrapper>
        {selectedEvent ? (
          <div>
            <EventTitle
              value={selectedEvent.title}
              onChange={(e) => changeEventHandler(e.target.value, "title")}
              placeholder="Название события"
            />
            <EventBody
              value={selectedEvent.description}
              onChange={(e) =>
                changeEventHandler(e.target.value, "description")
              }
              placeholder="Описание события"
            />
            <ButtonsWrapper>
              <ButtonWrapper onClick={cancelButtonHandler}>
                Cancel
              </ButtonWrapper>
              <ButtonWrapper onClick={eventFetchHandler}>
                {method}
              </ButtonWrapper>
              {method === "Update" ? (
                <ButtonWrapper $danger onClick={removeEventHandler}>
                  Remove
                </ButtonWrapper>
              ) : null}
            </ButtonsWrapper>
          </div>
        ) : (
          <NoEventMsg> No event selected</NoEventMsg>
        )}
      </EventFormWrapper>
    </DayShowWrapper>
  );
};
