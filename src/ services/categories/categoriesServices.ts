import { showNotifications } from "../../utils/notifications";
import axiosInstance from "../axiosInstance";

const CATEGORIES_URL = "/api/categories";

const allCategories = async () => {
  try {
    const response = await axiosInstance.get(`${CATEGORIES_URL}`);
    const result = response?.data?.data;
    console.log("response",response)

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

export const categoriesServices = {
  allCategories,
};
