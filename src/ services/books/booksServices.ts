import axiosInstance from "../axiosInstance";
import { showNotifications } from "../../utils/notifications";
import { AxiosError } from "axios";

const BOOKS_URL = "/api/books";
const CREATE_BOOK_URL = "/api/books/new";

const allBooks = async (booksState: string, currentPage: number) => {
  const BooksType_URL =
    booksState === "books" ? BOOKS_URL : `${BOOKS_URL}/${booksState}`;

  console.log(BooksType_URL);
  try {
    const response = await axiosInstance.get(
      `${BooksType_URL}?page=${currentPage}`
    );
    const result = response?.data?.data;
    console.log(response?.data?.data);

    return {
      data: result,
      status: response?.status,
    };
  } catch (error: any) {
    return {
      status: error?.status,
      error: error?.response,
    };
  }
};
const showBook = async (bookId: number) => {
  try {
    const response = await axiosInstance.get(`${BOOKS_URL}/${bookId}`);
    const result = response?.data?.data;

    return {
      data: result,
      status: response?.status,
    };
  } catch (error: any) {
    return {
      status: error?.status,
    };
  }
};
const createBook = async (formData: any) => {
  try {
    const response = await axiosInstance.post(`${CREATE_BOOK_URL}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
    return {
      status: response.status,
    };
  } catch (error: any) {
    const errorDetails = error?.response?.data?.errors;
    // // لعرض كل الأخطاء الموجودة ضمن كائن (error)
    Object.values(errorDetails).forEach((messages: any) => {
      if (Array.isArray(messages)) {
        messages.forEach((msg) => showNotifications(msg, "error"));
      }
    });
  }
};
const updateBook = async (bookId: number, formData: any) => {
  try {
    const response = await axiosInstance.patch(
      `${BOOKS_URL}/${bookId}/edit`,
      formData
    );
    console.log(response);
    return {
      status: response.status,
    };
  } catch (error: any) {
    const errorDetails = error?.response?.data?.errors;
    // // لعرض كل الأخطاء الموجودة ضمن كائن (error)
    Object.values(errorDetails).forEach((messages: any) => {
      if (Array.isArray(messages)) {
        messages.forEach((msg) => showNotifications(msg, "error"));
      }
    });
  }
};
const deleteBook = async (idBook: number) => {
  try {
    const response = await axiosInstance.delete(
      `${BOOKS_URL}/${idBook}/delete`
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

const rateBook = async (idBook: number, param: { rating: number | null }) => {
  try {
    const response = await axiosInstance.post(
      `${BOOKS_URL}/${idBook}/rate`,
      param
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
const isFavBook = async (idBook: number) => {
  try {
    const response = await axiosInstance.post(
      `${BOOKS_URL}/${idBook}/favorite`
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

const isReadBook = async (idBook: number) => {
  try {
    const response = await axiosInstance.post(`${BOOKS_URL}/${idBook}/read`);
    console.log(response);
    return {
      status: response.status,
    };
  } catch (error: any) {
    return {
      status: error?.status,
    };
  }
};

const downloadBook = async (idBook: number) => {
  try {
    const response = await axiosInstance.post(
      `${BOOKS_URL}/${idBook}/download`
    );
    console.log(response?.data?.data);
    const result = response?.data?.data;
    return {
      status: response.status,
      data: result,
    };
  } catch (error: any) {
    return {
      status: error?.status,
    };
  }
};
const searchBooks = async (query: string) => {
  try {
    const response = await axiosInstance.get(`${BOOKS_URL}?${query}`);
    console.log(response);
    return {
      status: response?.status,
      data: response?.data?.data
    };
  } catch (error: any) {
    console.log(error);
    return {
      status: error?.status,
      data: error?.response?.data?.message,
    };
  }
};
export const booksServices = {
  allBooks,
  showBook,
  createBook,
  deleteBook,
  updateBook,
  isFavBook,
  rateBook,
  isReadBook,
  downloadBook,
  searchBooks,
};
