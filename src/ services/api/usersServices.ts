import { showNotifications } from "../../utils/notifications";
import axiosInstance from "../axiosInstance";

const USERS_URL = "api/users";
const TOGGLESTATUS = "/api/users/toggleAccountActiveStatus/";


const getUsers = async () => {
  try {
    const response = await axiosInstance.get(`${USERS_URL}`);
    const result = response?.data;
    console.log("result.data", result?.data);

    return {
      data: result,
      status: response?.status,
    };
  } catch (error: any) {
    const errorDetails = error?.response?.data?.message || {};
    console.log(error);
    showNotifications(errorDetails, "error");
  }
};

const toggleAccountActiveStatus = async (id: number) => {
  try {
    const response = await axiosInstance.post(`${TOGGLESTATUS}${id}`);
    const result = response?.data;
    console.log("result.data", result?.data);

    return {
      data: result,
      status: response?.status,
    };
  } catch (error: any) {
    const errorDetails = error?.response?.data?.message || {};
    console.log(error);
    showNotifications(errorDetails, "error");
  }
};
const changeRole = async (id: number,userPassword:string) => {
 
  try {

    const response = await axiosInstance.post(`${USERS_URL}/${id}/changeType`,{password:userPassword});
    const result = response?.data;
    console.log("result.data", result?.data);

    return {
      data: result,
      status: response?.status,
    };
  } catch (error: any) {
    const errorDetails = error?.response?.data?.message || {};
    console.log(error);
    showNotifications(errorDetails, "error");
  }
};
const deleteUser = async (idUser: number) => {
  try {
    const response = await axiosInstance.delete(
      `${USERS_URL}/delete/${idUser}`
    );
    return {
      status: response.status,
    };
  } catch (error: any) {
    return {
      status: error?.status,
    };
  }
};
export const usersServices = {
  getUsers,
  toggleAccountActiveStatus,
  changeRole,
  deleteUser
};
