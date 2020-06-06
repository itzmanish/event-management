import { toast } from "react-toastify";

// Avoid reusing so I made utils function with toast function
export const Toast = (msg) => {
  toast(msg, {
    className: "flex rounded py-2 px-4 bg-black mb-2",
  });
};
