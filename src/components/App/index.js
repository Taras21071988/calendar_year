import React, { useEffect } from "react";
import moment from "moment";
import { Header } from "../Header";
import { Monitor } from "../Monitor";
import { CalendarGrid } from "../CalendarGrid";
import { styled } from "styled-components";
import { useState } from "react";
import { DISPLAY_MODE_DAY, DISPLAY_MODE_MONTH } from "../../helpers/constants";
import { DayShowComponents } from "../DayShowComponent";
import {
  ButtonWrapper,
  ButtonsWrapper,
  EventBody,
  EventTitle,
} from "../../containers/StyledComponents";

const ShadowWrapper = styled.div`
  min-width: 850px;
  height: 702px;
  border-radius: 8px;
  overflow: hidden;
  border-top: 1px solid #737374;
  border-left: 1px solid #464648;
  border-right: 1px solid #464648;
  border-bottom: 2px solid #464648;
  box-shadow: 0 0 0 1px #1a1a1a, 0 8px 20px 6px #888;
  display: flex;
  flex-direction: column;
`;

const FormPositionWrapper = styled.div`
  position: absolute;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.35);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FormWrapper = styled(ShadowWrapper)`
  width: 320px;
  min-width: 320px;
  height: 140px;
  background-color: #1e1f21;
  color: #dddddd;
  box-shadow: unset;
  padding: 15px;
`;

const url = "http://localhost:3001";
const totalDay = 42;
const defaultEvent = {
  title: "",
  description: "",
  date: moment().format("X"),
};

function App() {
  const [displayMode, setDisplayMode] = useState(DISPLAY_MODE_MONTH);
  moment.updateLocale("en", { week: { dow: 1 } });

  const [today, setToday] = useState(moment());
  const startDay = today.clone().startOf("month").startOf("week");

  const prevHandler = () => {
    setToday((prev) => prev.clone().subtract(1, displayMode));
  };
  const todayHandler = () => {
    setToday(moment());
  };
  const nextHandler = () => {
    setToday((prev) => prev.clone().add(1, displayMode));
  };

  const startDateQuery = startDay.clone().format("X");
  const endDateQuery = startDay.clone().add(totalDay, "days").format("X");

  const [events, setEvents] = useState([]);
  const [event, setEvent] = useState(null);
  const [isShowForm, setShowForm] = useState(false);
  const [method, setMethod] = useState(null);

  useEffect(() => {
    fetch(`${url}/events?date_gte=${startDateQuery}&date_lte=${endDateQuery}`)
      .then((res) => res.json())
      .then((res) => {
        setEvents(res);
      });
  }, [today]);

  const openFormHandler = (methodName, eventForUpdate, dayItem) => {
    setEvent(eventForUpdate || { ...defaultEvent, date: dayItem.format("X") });
    setMethod(methodName);
  };
  const openModalFormHandler = (methodName, eventForUpdate, dayItem) => {
    setShowForm(true);
    openFormHandler(methodName, eventForUpdate, dayItem);
  };

  const cancelButtonHandler = () => {
    setShowForm(false);
    setEvent(null);
  };
  const changeEventHandler = (text, field) => {
    setEvent((prevState) => ({
      ...prevState,
      [field]: text,
    }));
  };

  const eventFetchHandler = () => {
    const fetchUrl =
      method === "Update" ? `${url}/events/${event.id}` : `${url}/events`;
    const httpMethod = method === "Update" ? "PATCH" : "POST";
    fetch(fetchUrl, {
      method: httpMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        if (method === "Update") {
          setEvents((prevState) =>
            prevState.map((eventEl) => (eventEl.id === res.id ? res : eventEl))
          );
        } else {
          setEvents((prevState) => [...prevState, res]);
        }
        cancelButtonHandler();
      });
  };

  const removeEventHandler = () => {
    const fetchUrl = `${url}/events/${event.id}`;
    const httpMethod = "DELETE";
    fetch(fetchUrl, {
      method: httpMethod,
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setEvents((prevState) =>
          prevState.filter((eventEl) => eventEl.id !== event.id)
        );
        cancelButtonHandler();
      });
  };
  return (
    <>
      {isShowForm ? (
        <FormPositionWrapper onClick={cancelButtonHandler}>
          <FormWrapper onClick={(e) => e.stopPropagation(e)}>
            <EventTitle
              value={event.title}
              onChange={(e) => changeEventHandler(e.target.value, "title")}
              placeholder="Название события"
            />
            <EventBody
              value={event.description}
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
          </FormWrapper>
        </FormPositionWrapper>
      ) : null}
      <ShadowWrapper>
        <Header />
        <Monitor
          today={today}
          prevHandler={prevHandler}
          todayHandler={todayHandler}
          nextHandler={nextHandler}
          setDisplayMode={setDisplayMode}
          displayMode={displayMode}
        />
        {displayMode === DISPLAY_MODE_MONTH ? (
          <CalendarGrid
            startDay={startDay}
            today={today}
            totalDay={totalDay}
            events={events}
            openFormHandler={openModalFormHandler}
            setDisplayMode={setDisplayMode}
          />
        ) : null}
        {displayMode === DISPLAY_MODE_DAY ? (
          <DayShowComponents
            events={events}
            today={today}
            selectedEvent={event}
            setEvent={setEvent}
            changeEventHandler={changeEventHandler}
            cancelButtonHandler={cancelButtonHandler}
            eventFetchHandler={eventFetchHandler}
            removeEventHandler={removeEventHandler}
            method={method}
            openFormHandler={openFormHandler}
          />
        ) : null}
      </ShadowWrapper>
    </>
  );
}

export default App;
