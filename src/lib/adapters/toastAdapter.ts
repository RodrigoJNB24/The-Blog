import { toast } from "react-toastify";

export const toastifyAdapter = {
  dismiss: toast.dismiss,
  error: toast.error,
  sucess: toast.success,
}