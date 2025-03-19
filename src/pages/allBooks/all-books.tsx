import { AddBook, BookCardComponent } from "../../components";
import { Box, Grid, IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { booksServices } from "../../ services/books/booksServices";
import styles from "../../components/Book/Book-Card.module.css";
import { useAuth } from "../../context/AuthContext";

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  category: string;
  is_favorite: boolean;
  is_read: boolean;
}
export default function AllBooksPage() {
  const { token } = useAuth();
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState("");

  const { booksState } = useParams();
  const [openAddBook, setOpenAddBook] = useState(false);
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    try {
      setError("");
      const fetchData = async () => {
        const response = await booksServices.allBooks(booksState || "books");
        if (response?.status === 200) {
          setBooks(response?.data?.books);
        } else {
          setError(
            "There are no books or perhaps there was an error, please try again."
          );
        }
      };

      fetchData();
    } catch (error) {
      console.log("error");
    }
  }, [booksState]);

  const handleClickOpen = () => {
    setOpenAddBook(true);
  };
  const handleCloseOpen = () => {
    setOpenAddBook(false);
  };
  return (
    <Box className={"w-100"} sx={{ width: "100%", px: 1 }}>
      {token && (userType === "owner" || userType === "admin") && (
        <Box
          sx={{
            mt: 2,
            display: "flex",
            gap: 2,
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <Tooltip title="Add new book">
            <IconButton
              onClick={handleClickOpen}
              color="inherit"
              sx={{
                color: "white",
                bgcolor: "#455f92",
                ":hover": {
                  scale: "calc(1.3)",
                  bgcolor: "#455f71",
                },
              }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      {error ? (
        <div className={styles.error}>
          <div className={styles.errorCard}>
            <img
              className={styles.errorImage}
              style={{ flexBasis: "40%" }}
              src="/public/system.png"
            />

            <p className={styles.errorMessage}>{error} </p>
          </div>
        </div>
      ) : (
        <Grid
          container
          rowSpacing={2}
          columnSpacing={2}
          justifyContent="start"
          sx={{ padding: 2 }}
        >
          {books.map((book) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={6}
              lg={3}
              display="flex"
              justifyContent="space-between"
            >
              <BookCardComponent
                name={book.title}
                author={book.author}
                category={book.category}
                cover={book.cover}
                bookId={1}
              />
            </Grid>
          ))}
        </Grid>
      )}
      {openAddBook && <AddBook open={openAddBook} onClose={handleCloseOpen} />}
    </Box>
  );
}
