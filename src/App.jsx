import React from "react";
import "./App.css";
import moment from "moment";

function App() {
  moment.updateLocale("en", { week: { dow: 1 } });
  const startDay = moment().startOf("month").startOf("week");
  const endDay = moment().endOf("month").endOf("week");
  const calendar = [];
  const day = startDay.clone();

  while (!day.isAfter(endDay)) {
    calendar.push(day.clone());
    day.add(1, "day");
  }

  console.log(calendar);
  const week_size = 7;
  const calendar_week = [];
  for (let i = 0; i < Math.ceil(calendar.length / week_size); i++) {
    calendar_week[i] = calendar.slice(i * week_size, i * week_size + week_size);
  }
  console.log(calendar_week);
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
