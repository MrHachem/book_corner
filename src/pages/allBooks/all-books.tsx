import { AddBook, BookCardComponent } from "../../components";
import { Box, Grid } from "@mui/material";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";

interface Book {
  id: number;
  title: string;
  author: string;
  image: string;
  bookCategory: string;
}
export default function AllBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [openAddBook, setOpenAddBook] = useState(false);
  const userType = localStorage.getItem("userType");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://676524c952b2a7619f5e8abb.mockapi.io/books"
      );
      const data = await response.json();
      setBooks(data);
    };
    fetchData();
  }, []);

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
          <Button
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
          </Button>
        </Box>
      )}

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
      {openAddBook && <AddBook open={openAddBook} onClose={handleCloseOpen} />}
    </Box>
  );
}
