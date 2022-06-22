// helper function to match appointment ids
export function matchId(appointments, ids) {
  const matched = ids.map(id => appointments[id]);
  return matched;
}

// returns an array of appointments for that day
export function getAppointmentsForDay(state, day) {
  let appointmentArr = [];

  state.days.map(dayObj => {
    if (dayObj.name === day) {
      dayObj.appointments.forEach((appt) => appointmentArr.push(appt));
    }
  })
    return matchId(state.appointments, appointmentArr);
}

// returns an object of interview information
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }

  const interviewerId = interview.interviewer;
  const interviewerObj= state.interviewers[interviewerId];

  const result = {
    student: interview.student,
    interviewer: interviewerObj
  };
  return result;
}

// returns an array of available interviewers for the day
export function getInterviewersForDay(state, name) {
  let interviewersArr = [];
  const filterDays = state.days.filter(day => day.name === name);

  if (state.days.length === 0 || filterDays.length === 0) {
    return [];
  }

  const interviewersList = filterDays[0].interviewers;

  for (let interviewer of interviewersList) {
    interviewersArr.push(state.interviewers[interviewer]);
  }

  return interviewersArr;
}

