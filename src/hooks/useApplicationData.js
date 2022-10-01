import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });
  // let spotsAvailable;
  // state.days.map(day => {
  //   if (day.name === state.day){
  //     spotsAvailable = day.spots
  //   }
  //   return spotsAvailable
  // })

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = state.days.map((day) => {
      if (day.name === state.day && state.appointments[id].interview === null) {
        return { ...day, spots: day.spots - 1 };
      } else {
        return day;
      }
    });

    return axios.put(`/api/appointments/${id}`, appointment).then(() => {
      setState({ ...state, appointments, days });
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const days = state.days.map((day) => {
      if (day.name === state.day) {
        return { ...day, spots: day.spots + 1 };
      } else {
        return day;
      }
    });

    return axios.delete(`/api/appointments/${id}`, appointment).then(() => {
      setState({ ...state, appointments, days });
    });
  }

  // useEffect(() => {
  //   const exampleSocket = new WebSocket(
  //     "ws://localhost:8001"
  //     )
  //     const msg = {
  //       interview: {
  //         student: "Roberto Cervantes",
  //         Interviewer: {
  //           id: 1,
  //           name: "Sylvia Palmer",
  //           avatar: "https://i.imgur.com/LpaY82x.png"
  //         }
  //       }
  //     }


  //     exampleSocket.onopen = (event) => {
  //       exampleSocket.send(updateAppointment(1, msg));

  //       exampleSocket.onmessage = (event) => {
  //         const msg = JSON.parse(event.data)
    
  //         //const interview = msg.type["SET_INTERVIEW"]
  //         console.log(msg)
  //       }
  //     };

  //   exampleSocket.onmessage = (event) => {
  //     console.log("Message received:", event.data);
  //   }

  // }, []);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}
