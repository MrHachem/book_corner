import { Dayjs } from "dayjs";
import axiosInstance from "../axiosInstance";
import { showNotifications } from "../../utils/notifications";

const BOOKS_URL = "/api/books";
const CREATE_BOOK_URL = "/api/books/new";

interface BookForm {
  title?: string;
  author?: string;
  category?: string;
  pdf?: any;
  cover?: any;
}

const allBooks = async (booksState: string) => {
  const BooksType_URL =
    booksState === "books" ? BOOKS_URL : `${BOOKS_URL}/${booksState}`;

  console.log(BooksType_URL);
  try {
    const response = await axiosInstance.get(`${BooksType_URL}`);
    const result = response?.data?.data;

    return {
      data: result,
      status: response?.status,
    };
  } catch (error) {}
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
export const booksServices = {
  allBooks,
  createBook,
};
