export function matchAppt(appointments, ids) {
  const matched = ids.map(id => appointments[id]);
  return matched;
}

export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  let appointmentArr = [];

  state.days.map(dayObj => {
    if (dayObj.name === day) {
      dayObj.appointments.forEach((appt) => appointmentArr.push(appt));
    }

  })
    return matchAppt(state.appointments, appointmentArr);
}
