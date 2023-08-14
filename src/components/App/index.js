import React, { useEffect } from "react";
import moment from "moment";
import { Header } from "../Header";
import { Monitor } from "../Monitor";
import { CalendarGrid } from "../CalendarGrid";
import { styled } from "styled-components";
import { useState } from "react";

const ShadowWrapper = styled.div`
  border-radius: 8px;
  overflow: hidden;
  border-top: 1px solid #737374;
  border-left: 1px solid #464648;
  border-right: 1px solid #464648;
  border-bottom: 2px solid #464648;
  box-shadow: 0 0 0 1px #1a1a1a, 0 8px 20px 6px #888;
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
  width: 200px;
  background-color: #1e1f21;
  color: #dddddd;
  box-shadow: unset;
`;

const EventTitle = styled.input`
  padding: 4px 14px;
  font-size: 0.85rem;
  width: 100%;
  border: unset;
  background-color: #1e1f21;
  color: #dddddd;
  outline: unset;
  border-bottom: 1px solid #464648;
`;
const EventBody = styled.input`
  padding: 4px 14px;
  font-size: 0.85rem;
  width: 100%;
  border: unset;
  background-color: #1e1f21;
  color: #dddddd;
  outline: unset;
  border-bottom: 1px solid #464648;
`;

const ButtonWrapper = styled.div`
  padding: 8px 14px;
  display: flex;
  justify-content: flex-end;
`;

const url = "http://localhost:3001";
const totalDay = 42;
const defaultEvent = {
  title: "",
  description: "",
  date: moment().format("X"),
};

function App() {
  moment.updateLocale("en", { week: { dow: 1 } });

  const [today, setToday] = useState(moment());
  const startDay = today.clone().startOf("month").startOf("week");

  const prevHandler = () => {
    setToday((prev) => prev.clone().subtract(1, "month"));
  };
  const todayHandler = () => {
    setToday(moment());
  };
  const nextHandler = () => {
    setToday((prev) => prev.clone().add(1, "month"));
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
        console.log(res);
      });
  }, [today]);

  const openFormHandler = (methodName, eventForUpdate) => {
    console.log("hi", methodName);
    setShowForm(true);
    setEvent(eventForUpdate || defaultEvent);
    setMethod(methodName);
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
      method === "update" ? `${url}/events/${event.id}` : `${url}/events`;
    const httpMethod = method === "update" ? "PATCH" : "POST";
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
        if (method === "update") {
          setEvents((prevState) =>
            prevState.map((eventEl) => (eventEl.id === res.id ? res : eventEl))
          );
        } else {
          setEvents((prevState) => [...prevState, res]);
        }
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
            />
            <EventBody
              value={event.description}
              onChange={(e) =>
                changeEventHandler(e.target.value, "description")
              }
            />
            <ButtonWrapper>
              <button onClick={cancelButtonHandler}>Cancel</button>
              <button onClick={eventFetchHandler}>{method}</button>
            </ButtonWrapper>
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
        />
        <CalendarGrid
          startDay={startDay}
          today={today}
          totalDay={totalDay}
          events={events}
          openFormHandler={openFormHandler}
        />
      </ShadowWrapper>
    </>
  );
}

export default App;
