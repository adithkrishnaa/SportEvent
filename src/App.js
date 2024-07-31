import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [events, setEvents] = useState([]);
  const [selectedEvents, setSelectedEvents] = useState(() => {
    const saved = localStorage.getItem("selectedEvents");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("selectedEvents", JSON.stringify(selectedEvents));
  }, [selectedEvents]);

  useEffect(() => {
    axios
      .get("https://run.mocky.io/v3/f96f98a7-c29e-465e-bc6d-806976a78e3a")
      .then((response) => {
        setEvents(response.data.events);
      })
      .catch((error) => {
        console.error("There was an error fetching the events!", error);
      });
  }, []);

  const selectEvent = (event) => {
    if (selectedEvents.length < 3 && !isConflicting(event)) {
      setSelectedEvents([...selectedEvents, event]);
    } else {
      alert(
        "You cannot select more than 3 events or events with conflicting times."
      );
    }
  };

  const deselectEvent = (event) => {
    setSelectedEvents(selectedEvents.filter((e) => e.id !== event.id));
  };

  const isConflicting = (newEvent) => {
    return selectedEvents.some(
      (event) =>
        newEvent.start_time < event.end_time &&
        newEvent.end_time > event.start_time
    );
  };

  return (
    <>
      <h1 className="text-4xl text-center font-bold animate-bounceIn">
        Sports Day Registration
      </h1>
      <div className="flex flex-col-2 border-2 border-black justify-evenly px-8 mx-5 my-2 mt-2 rounded-3xl min-h-screen bg-gray-100">
        <div className="flex relative p-2 w-1/2">
          <h2 className="text-2xl right-1/2 -translate-x-56 absolute font-semibold mb-4">
            Events
          </h2>
          <div className="grid grid-cols-2 mt-10 gap-4 rounded-lg p-5 border-2 border-black">
            {events.map((event) => (
              <div
                className={`flex mx-auto rounded-3xl p-4 mb-4 border-2 shadow-xl animate-fadeIn ${
                  selectedEvents.includes(event)
                    ? "bg-gray-400"
                    : "bg-gradient-to-tr from-gray-400 to-blue-300"
                }`}
                key={event.id}>
                <div className="border-r-2 border-black my-2 px-2">
                  <h1 className="text-6xl font-extrabold text-blue-500">
                    {event.event_category.charAt(0).toUpperCase()}
                  </h1>
                </div>
                <div className="ml-5">
                  <h3 className="text-xl font-bold">{event.event_name}</h3>
                  <p>({event.event_category})</p>
                  <p>
                    {new Date(event.start_time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    -{" "}
                    {new Date(event.end_time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <div className="relative pb-14">
                    <button
                      className={`mt-2 px-4 absolute left-1/2 -translate-x-11 object-center text-center py-2 rounded ${
                        selectedEvents.includes(event)
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                      onClick={() => selectEvent(event)}
                      disabled={selectedEvents.includes(event)}>
                      {selectedEvents.includes(event) ? "Selected" : "Select"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex relative w-1/2 gap-2 p-4 ">
          <h2 className="text-2xl absolute font-semibold">Selected Events</h2>
          <div className="grid grid-cols-2 gap-2 h-96 w-full mt-8 p-2 rounded-xl border-2 border-black animate-fadeIn">
            {selectedEvents.map((event) => (
              <div
                className="p-4 h-44 border-transparent bg-gradient-to-bl from-green-300 to-yellow-200 rounded shadow-md"
                key={event.id}>
                <div className="flex">
                  <div className="border-r-2 border-black my-2 px-2">
                    <h1 className="text-6xl font-extrabold text-blue-500">
                      {event.event_category.charAt(0).toUpperCase()}
                    </h1>
                  </div>
                  <div className="ml-5">
                    <h3 className="text-xl font-bold">{event.event_name}</h3>
                    <p>({event.event_category})</p>
                    <p>
                      {new Date(event.start_time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      -{" "}
                      {new Date(event.end_time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <div>
                      <button
                        className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => deselectEvent(event)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
