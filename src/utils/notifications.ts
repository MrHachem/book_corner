import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// دالة عرض الإشعارات مع تأثيرات محسنة
export const showNotifications = (message: string, type: "success" | "error" | "info" | "warning") => {
    switch (type) {
        case "success":
            toast.success(message, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
            break;
        case "error":
            toast.error(message, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
            break;
        case "info":
            toast.info(message, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
            break;
        case "warning":
            toast.warning(message, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
            break;
        default:
            toast(message, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "light",
            });
    }
};
