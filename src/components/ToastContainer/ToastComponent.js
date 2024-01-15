import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToastSuccessMessage = async (message) => {
  toast.success(message, {
    position: toast.POSITION.BOTTOM_CENTER,
  });
};

export const showToastErrorMessage = (message) => {
  toast.error(message, {
    position: toast.POSITION.BOTTOM_CENTER,
  });
};
