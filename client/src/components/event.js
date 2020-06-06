import React, { useContext } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../contexts/UserProvider";

const Event = ({ event, updateData }) => {
  const { isLoggedIn } = useContext(UserContext);
  const date = new Date(parseInt(event.createdAt, 16) * 1000);

  const setApprovedEvent = async () => {
    if (isLoggedIn) {
      try {
        const res = await fetch("/event/" + event._id, {
          method: "PUT",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventStatus: event.event_status === "draft" ? "approved" : "draft",
          }),
        });

        if (res.status === 200) {
          updateData();
        }
      } catch (error) {
        console.log(error);
        toast(error.message, {
          className: "flex rounded py-2 px-4 bg-black mb-2",
        });
      }
    } else {
      toast("You need to login before changing event status.", {
        className: "flex rounded py-2 px-4 bg-black mb-2",
      });
    }
  };

  return (
    <div
      onClick={setApprovedEvent}
      className="mt-4 flex lg:flex-no-wrap flex-wrap bg-white hover:shadow-md rounded duration-200 ease-in-out transition cursor-pointer"
    >
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
