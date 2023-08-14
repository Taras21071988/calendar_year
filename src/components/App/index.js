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
const url = "http://localhost:3001";
const totalDay = 42;

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

  useEffect(() => {
    fetch(`${url}/events?date_gte=${startDateQuery}&date_lte=${endDateQuery}`)
      .then((res) => res.json())
      .then((res) => {
        setEvents(res);

      });
  }, [today]);

  return (
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
      />
    </ShadowWrapper>
  );
}

export default App;
