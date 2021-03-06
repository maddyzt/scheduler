import { useEffect, useState } from 'react';
import axios from 'axios';

// sets state, gets data from API, books interview/cancels interview and updates spots accordingly
export default function useApplicationData(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => setState({...state, day});
  
  // get data from API
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

  // counts null appointments to update spots field in state object
  function updateSpots(state) {
    const dayToChange = state.days.find(day => day.name === state.day);
    const newDay = {...dayToChange};

    const emptyAppts = dayToChange.appointments.filter((apptId) => !state.appointments[apptId].interview);
    const spots = emptyAppts.length;

    newDay.spots = spots;

    const newDays = [...state.days];
    const dayIndex = state.days.findIndex(day => day.name === state.day);
    newDays[dayIndex] = newDay;

    const newState = {...state};
    newState.days = newDays;

    return newState;

  }
  
  // updates state with booked interview
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    const newState = {...state}
    newState.appointments = appointments;

    const newNewState = updateSpots(newState);

    return axios.put(`/api/appointments/${id}`, {interview:interview})
    .then(res => {
      setState(newNewState);
      return res;
    })
  }
  
  // updates state with canceled interview
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
  
    const newState = {...state}
    newState.appointments = appointments;

    const newNewState = updateSpots(newState);

    return axios.delete(`/api/appointments/${id}`)
    .then(res => {
      setState(newNewState);
      return res;
    })
  }

  return { state, setDay, bookInterview, cancelInterview };
}
