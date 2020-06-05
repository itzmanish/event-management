import React, { useState, useEffect } from "react";
import Events from "./events";
import Header from "./header";

const Home = () => {
  const [activeEvents, setActiveEvents] = useState([]);
  const [waitlistEvents, setWaitlistEvents] = useState([]);
  async function fetchData() {
    try {
      const allEvents = await fetch("/events");
      const jsonData = await allEvents.json();
      const waitlistData = jsonData.filter(
        (event) => event.event_status === "draft"
      );
      waitlistData.forEach((data) =>
        jsonData.splice(
          jsonData.findIndex((e) => e._id === data._id),
          1
        )
      );
      setActiveEvents(jsonData);
      setWaitlistEvents(waitlistData);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="max-w-screen-lg lg:mx-auto text-black mt-8 mx-4">
      <Header />
      <div className="mt-16 flex flex-wrap lg:-mx-4 mx-0">
        <div className="w-full lg:w-1/2 lg:px-4">
          <div className="text-gray-800 font-bold">Active events</div>
          <Events events={activeEvents} />
        </div>
        <div className="w-full lg:w-1/2 lg:px-4 mt-4 lg:mt-0">
          <div className="text-gray-800 font-bold">Event waitlist</div>
          <Events events={waitlistEvents} />
        </div>
      </div>
    </div>
  );
};

export default Home;
