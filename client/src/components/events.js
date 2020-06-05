import React from "react";
import Event from "./event";
const Events = ({ events }) => {
  return (
    <>
      {events.length > 0 ? (
        events.map((event) => <Event key={event._id} event={event} />)
      ) : (
        <div className="mt-16 mx-auto text-center">No events available.</div>
      )}
    </>
  );
};

export default Events;
