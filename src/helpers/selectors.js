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
  console.log(appointments);
  return appointmentList;
}
