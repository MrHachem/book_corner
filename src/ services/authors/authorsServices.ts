import { showNotifications } from "../../utils/notifications";
import axiosInstance from "../axiosInstance";

const AUTHORS_URL = "/api/authors";

const allAuthors = async () => {
  try {
    const response = await axiosInstance.get(`${AUTHORS_URL}`);
    const result = response?.data?.data;
    console.log("Authors",response)

    return {
      data: result,
      status: response?.status,
    };
  } catch (error: any) {
    const errors = error?.response?.data?.message;
    return {
      error: errors,
    };
  }
};

export const authorsServices = {
  allAuthors,
};
