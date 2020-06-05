import React from "react";

const Event = ({ event }) => {
  let date = new Date(parseInt(event.createdAt, 16) * 1000);

  return (
    <div className="mt-4 flex lg:flex-no-wrap flex-wrap bg-white hover:shadow-md rounded duration-200 ease-in-out transition">
      <img
        src={event.event_picture || "https://picsum.photos/200"}
        className="lg:w-48 w-full h-auto"
        alt="event_picture"
      />
      <div className="flex flex-col text-gray-800 mx-2 lg:py-2 py-4">
        <div className="flex-row text-xs text-gray-600 flex">
          <div className="mr-2">{event.event_type}</div>
          <div className="border-l border-black pl-2">
            {date.toLocaleString("en-IN").toString()}
          </div>
        </div>
        <div className="font-bold text-black">{event.event_title}</div>
        <div className="text-sm">{event.event_details}</div>
        <div className="mt-2 text-sm">{event.social_links}</div>
      </div>
    </div>
  );
};

export default Event;
