import React, { useState } from "react";
import { toast } from "react-toastify";
import Layout from "./layout";

const AddEvent = () => {
  const [values, setValues] = useState({});
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleImageUpload = (e) => {
    setValues({
      ...values,
      [e.target.name]: URL.createObjectURL(e.target.files[0]),
    });
  };
  const addEvent = async () => {
    try {
      const res = await fetch("/create-event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const resData = await res.json();
      console.log({ res, resData });

      if (res.status === 201) {
        console.log(resData);
        toast("Event Added", {
          className: "flex rounded py-2 px-4 bg-black mb-2",
        });
      } else {
        toast(resData.message, {
          className: "flex rounded py-2 px-4 bg-black mb-2",
        });
      }
    } catch (error) {
      toast(error.message, {
        className: "flex rounded py-2 px-4 bg-black mb-2",
      });
    }
  };
  return (
    <Layout>
      <div className="w-full mt-16">
        <div className="text-center mb-8 text-lg font-bold text-black">
          Add Event
        </div>
        <form className="w-full max-w-xl mx-auto">
          <p className="text-orange-500 text-xs italic mb-6">
            * All fields are required.
          </p>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="eventTitle"
              >
                Event Title
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-700 rounded py-3 px-4 mb-3 leading-tight"
                onChange={handleChange}
                name="eventTitle"
                type="text"
                placeholder="A good event"
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="eventType"
              >
                Event Type
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-white text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  name="eventType"
                  onChange={handleChange}
                >
                  <option>Select type of event</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="eventDetails"
              >
                Event Details
              </label>
              <textarea
                className="appearance-none block w-full bg-white text-gray-700 rounded py-3 px-4 mb-3 leading-tight h-24"
                onChange={handleChange}
                type="text"
                name="eventDetails"
                placeholder="Be descriptive"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <label className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="eventPicture"
              >
                Event Picture
              </label>
              <div className="appearance-none block w-full bg-black text-white cursor-pointer rounded py-3 px-4 mb-3 leading-tight text-center">
                Upload
              </div>
              <input
                onChange={handleImageUpload}
                name="eventPicture"
                type="file"
                className="hidden"
              />
              {values.eventPicture && (
                <p className="text-gray-600 text-xs italic">
                  {values.eventPicture}
                </p>
              )}
            </label>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="socialLinks"
              >
                Social Links
              </label>
              <input
                className="appearance-none block w-full bg-white text-gray-700 rounded py-3 px-4 leading-tight "
                onChange={handleChange}
                name="socialLinks"
                type="text"
                placeholder="https://google.com"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-2">
            <div onClick={addEvent} className="w-full px-3">
              <div className="block w-full bg-black text-white rounded py-3 px-4 cursor-pointer text-center">
                Save
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddEvent;
