export function getAppointmentsForDay(state, day) {
  let appointments;
  let appointmentList = [];

  if (state.days.length === 0) {
    return appointmentList;
  }

  for (let d of state.days) {
    if (d.name === day) {
      appointments = d.appointments;
    }
  }

  if (!appointments) {
    return appointmentList;
  }

  for (let appointment of appointments) {
    appointmentList.push(state.appointments[appointment]);
  }
  //console.log(appointments);
  return appointmentList;
}

export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }

  let interviewObject = {};
  let interviewerID = interview.interviewer;
  interviewObject.student = interview.student;
  interviewObject.interviewer = state.interviewers[interviewerID];
  return interviewObject;
}

export function getInterviewersForDay(state, day) {
  let interviewersList = [];
  let interviewers;

  if (state.days.length === 0) {
    return interviewersList;
  }

  
  for (let d of state.days) {
    if (d.name === day) {
      interviewers = d.interviewers;
    }
  }
  
  if (!interviewers) {
    return interviewersList;
  }

  for (let interviewer of interviewers) {
    interviewersList.push(state.interviewers[interviewer]);
  }

  return interviewersList;
}
