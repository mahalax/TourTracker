import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure({ hideProgressBar: true });
export const common = {
  // toast
  notify(type, msg) {
    switch (type) {
      case "S":
        toast.success(msg);
        break;
      case "W":
        toast.warning(msg);
        break;
      case "E":
        toast.error(msg);
        break;
      case "I":
        toast.info(msg);
        break;
      case "M":
        toast(msg);
        break;
    }
  }
}

