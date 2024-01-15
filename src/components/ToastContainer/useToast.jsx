import { useEffect } from "react";
import {
  showToastErrorMessage,
  showToastSuccessMessage,
} from "./ToastComponent";

export const useToast = (
  status,
  resetStore,
  toastSuccessMessage,
  toastErrorMessage,
  dispatch
) => {
  useEffect(() => {
    if (status === 200) {
      showToastSuccessMessage(toastSuccessMessage);
      dispatch(resetStore);
    } else if (
      status === 400 ||
      status === 409 ||
      status === 404 ||
      status === 422 ||
      status === 401 ||
      status === 403 ||
      status === 500
    ) {
      showToastErrorMessage(toastErrorMessage);
      dispatch(resetStore);
    }
  }, [status, resetStore, toastSuccessMessage, toastErrorMessage]);
};
