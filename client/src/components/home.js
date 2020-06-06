import React, { useState, useEffect } from "react";
import { Toast } from "../utils";
import Events from "./events";
import Layout from "./layout";

const Home = () => {
  const [activeEvents, setActiveEvents] = useState([]);
  const [waitlistEvents, setWaitlistEvents] = useState([]);
  async function fetchData() {
    try {
      const allEvents = await fetch("/events");
      if (allEvents.status === 200) {
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
        Toast("All Events loaded!");
      }
    } catch (err) {
      console.log(err);
      Toast(err.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <Layout>
      <div className="mt-16 flex flex-wrap lg:-mx-4 mx-0 mb-8">
        <div className="w-full lg:w-1/2 lg:px-4">
          <div className="text-gray-800 font-bold">Active events</div>
          <Events events={activeEvents} updateData={fetchData} />
        </div>
        <div className="w-full lg:w-1/2 lg:px-4 mt-4 lg:mt-0">
          <div className="text-gray-800 font-bold">Event waitlist</div>
          <Events events={waitlistEvents} updateData={fetchData} />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
