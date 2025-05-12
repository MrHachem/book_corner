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
const deleteCategory = async (idUser: number) => {
  try {
    const response = await axiosInstance.delete(`${CATEGORIES_URL}/${idUser}`);
    return {
      status: response.status,
    };
  } catch (error: any) {
    return {
      status: error?.status,
    };
  }
};
const updateCategory = async (idCategory: number, name: string) => {
  const test ={
    "name": `${name}`
}
  try {
    const response = await axiosInstance.patch(`${CATEGORIES_URL}/${idCategory}`,test);
    console.log(response)
    return {
      data: response?.data?.message,
      status: response.status,
    };
  } catch (error: any) {
    return {
      message:error?.response?.data?.message,
      status: error?.status,
    };
  }
};
const createCategory = async (name:string) => {
  const test ={
    "name": `${name}`
}
  try {
    const response = await axiosInstance.post(`${CATEGORIES_URL}/new`,test);

    return {
      data: response?.data?.message,
      status: response.status,
    };
  } catch (error: any) {
    console.log(error?.response?.data?.message)
    return {
      message:error?.response?.data?.message,
      status: error?.status,
    };
  }
};

export const categoriesServices = {
  allCategories,
  deleteCategory,
  updateCategory,
  createCategory,
};
