import React, { useState, useEffect }  from "react";

import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";


export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });

  const dailyAppointments = getAppointmentsForDay(state, state.day);

  const setDay = day => setState({...state, day});

  useEffect(() => {
    let days = axios.get("/api/days");
    let appointments = axios.get("/api/appointments");
    let interviewers = axios.get("/api/interviewers");

    Promise.all([days, appointments, interviewers]).then((results) => {
      days = results[0].data;
      appointments = results[1].data;
      interviewers = results[2].data;

      setState((prev) => ({ ...prev, days, appointments, interviewers }));
    });
  }, []);

  const schedule = dailyAppointments.map((appt) => {
    return (
        <Appointment key={appt.id} id={appt.id} time={appt.time} interview={appt.interview} />
      )
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList 
          days={state.days} 
          value={state.day} 
          onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
      </section> 
    </main>
  );
}




