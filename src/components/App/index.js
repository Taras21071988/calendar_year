import React from "react";
import moment from "moment";
import { Header } from "../Header";
import { Monitor } from "../Monitor";
import { CalendarGrid } from "../CalendarGrid";
import { styled } from "styled-components";

const ShadowWrapper = styled.div`
  border-radius: 8px;
  overflow: hidden;
  border-top: 1px solid #737374;
  border-left: 1px solid #464648;
  border-right: 1px solid #464648;
  border-bottom: 2px solid #464648;
  box-shadow: 0 0 0 1px #1a1a1a, 0 8px 20px 6px #888;
`;

function App() {
  moment.updateLocale("en", { week: { dow: 1 } });
  const today = moment();
  const startDay = today.clone().startOf("month").startOf("week");

  return (
    <ShadowWrapper>
      <Header />
      <Monitor today={today} />
      <CalendarGrid startDay={startDay} />
    </ShadowWrapper>
  );
}

export default App;
