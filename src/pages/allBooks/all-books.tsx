import { AddBook, BookCardComponent } from "../../components";
import { Box, Card, Grid, IconButton, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { booksServices } from "../../ services/books/booksServices";
import { showNotifications } from "../../utils/notifications";
import styles from "../../components/Book/Book-Card.module.css";

interface Book {
  id: number;
  title: string;
  author: string;
  image: string;
  bookCategory: string;
}
export default function AllBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState("");

  //const [booksState,setBooksState]=useState("books");
  const { booksState } = useParams();
  console.log("BOOKS STATE FAV | UN READ | ALL", booksState || "books");
  const [openAddBook, setOpenAddBook] = useState(false);
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    try {
      setError("");
      const fetchData = async () => {
        const response = await booksServices.allBooks(booksState || "books");

        console.log(response);
        if (response?.status === 200) {
          setBooks(response.data);
        } else {
          setError(
            "There are no books or perhaps there was an error, please try again."
          );
        }
      };

      fetchData();
    } catch (error) {
      console.log("uhhhhhhhhhhhhhhhhhhhhh");
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
      {userType === "owner" && (
        <Box
          sx={{
            mt: 2,
            display: "flex",
            gap: 2,
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          {/* <Button
            sx={{
              padding: "10px",
              borderRadius: "10px",
              fontSize: "1rem",
              fontFamily: "Cairo, sans-serif",
              bgcolor: "#4b7fb2",
            }}
            variant="contained"
            endIcon={<AddIcon sx={{ marginRight: 2 }} />}
            onClick={handleClickOpen}
          >
            إضافة كتاب
          </Button> */}
          <Tooltip title="تسجيل خروج">
            <IconButton
              onClick={handleClickOpen}
              color="inherit"
              sx={{ color: "white", bgcolor: "#455f92",
                ":hover" :{
                  scale:"calc(1.3)",
                  bgcolor:"#455f71"
                }
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
        <Grid container spacing={2} justifyContent={"end"}>
          {books.map((book) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              lg={3}
              sx={{
                marginY: 3,
              }}
            >
              <BookCardComponent
                name={book.title}
                author={book.author}
                bookCategory={book.bookCategory}
                image={"/public/Atomic_Habits.jpg"}
                bookId={book.id}
              />
            </Grid>
          ))}
        </Grid>
      )}
      {openAddBook && <AddBook open={openAddBook} onClose={handleCloseOpen} />}
    </Box>
  );
}
