import React from "react";
import { isDayContainCurrentEvent } from "../../helpers";
import styled from "styled-components";
import {
  EventItemWrapper,
  EventListItemWrapper,
  EventListWrapper,
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
            <h3>{selectedEvent.title}</h3>
            <h2>{selectedEvent.description}</h2>
          </div>
        ) : (
          <NoEventMsg> No event selected</NoEventMsg>
        )}
      </EventFormWrapper>
    </DayShowWrapper>
  );
};
