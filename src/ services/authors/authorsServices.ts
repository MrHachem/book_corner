import axiosInstance from "../axiosInstance";

const AUTHORS_URL = "/api/authors";

const allAuthors = async () => {
  try {
    const response = await axiosInstance.get(`${AUTHORS_URL}`);
    const result = response?.data?.data;
    console.log("Authors", result);

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
const deleteAuthor = async (idUser: number) => {
  try {
    const response = await axiosInstance.delete(`${AUTHORS_URL}/${idUser}`);
    return {
      status: response.status,
    };
  } catch (error: any) {
    return {
      status: error?.status,
    };
  }
};
const updateAuthor = async (idAuthor: number, name: string) => {
  const test ={
    "name": `${name}`
}
  try {
    const response = await axiosInstance.patch(`${AUTHORS_URL}/${idAuthor}`,test);
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
const createAuthor = async (name:string) => {
  const test ={
    "name": `${name}`
}
  try {
    const response = await axiosInstance.post(`${AUTHORS_URL}/new`,test);

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

export const authorsServices = {
  allAuthors,
  deleteAuthor,
  updateAuthor,
  createAuthor,
};
