import React from "react";
import moment from "moment";
import { Header } from "../Header";
import { Monitor } from "../Monitor";
import { CalendarGrid } from "../CalendarGrid";

function App() {
  moment.updateLocale("en", { week: { dow: 1 } });
  const startDay = moment().startOf("month").startOf("week");

  return (
    <div className="App">
      <Header />
      <Monitor />
      <CalendarGrid startDay={startDay} />
    </div>
  );
}

export default App;
