import { AddBook, BookCardComponent } from "../../components";
import { Box, Grid, IconButton, Pagination, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { booksServices } from "../../ services/books/booksServices";
import styles from "../../components/Book/Book-Card.module.css";
import { useAuth } from "../../context/AuthContext";
import BookSearch from "../../components/Book/Book-search.component";
import { showNotifications } from "../../utils/notifications";

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
  const booksCache = useRef<Map<string, any[]>>(new Map());
  const { token } = useAuth();
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 2,
    per_page: 1,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [searchParams, setSearchParams] = useState<{
    author: string;
    category: string;
    title: string;
  }>({
    author: "",
    category: "",
    title: "",
  });
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState("");
  const [lodaing, setLodaing] = useState(false);
  const [searching, setSearching] = useState(false);
  const navigate = useNavigate();

  const { booksState } = useParams();
  const [openAddBook, setOpenAddBook] = useState(false);
  const userType = localStorage.getItem("userType");

  const getBooks = useCallback(
    async (page = 1) => {
      const cashKey = `page-${page}`;

      if (booksCache.current.has(cashKey)) {
        setBooks(booksCache.current.get(cashKey)!);
        return;
      }

      setError("");
      setLodaing(true);
      try {
        const response = await booksServices.allBooks(
          booksState || "books",
          page
        );
        if (response?.status === 200) {
          setLodaing(false);
          switch (booksState ?? "books") {
            case "books":
              setBooks(response?.data?.books);
              booksCache.current.set(cashKey, response?.data?.books);
              break;
            case "favoriteBooks":
              setBooks(response?.data?.favorite_books);
              booksCache.current.set(cashKey, response?.data?.favorite_books);
              break;
            case "readBooks":
              setBooks(response?.data?.read_books);
              booksCache.current.set(cashKey, response?.data?.read_books);
              break;
            case "unReadBooks":
              setBooks(response?.data?.read_books);
              booksCache.current.set(cashKey, response?.data?.read_books);
              break;
          }
          setPagination(response?.data?.pagination);
        } else if (response?.status === 404) {
          console.log(response?.error?.data?.message);
          response?.error?.data?.message === "لا يوجد كتب"
            ? setError("There are no books ")
            : navigate("*");
        } else if (response?.status === 401) {
          console.log(response?.error?.data?.message);
          showNotifications("Unauthenticated please login", "warning");
          navigate("/auth/login");
        } else {
          setError("perhaps there was an error, please try again.");
        }
      } catch (error) {
        console.log("error");
        setLodaing(false);
      } finally {
        setLodaing(false);
      }
    },
    [booksState]
  );
  const handleClickOpen = () => {
    setOpenAddBook(true);
  };
  const handleCloseOpen = () => {
    setOpenAddBook(false);
  };
  const handleSearch = async (params: {
    author: string;
    category: string;
    title: string;
  }) => {
    setSearchParams(params);
    setIsSearching(true);
    setCurrentPage(1);
  };
  const handleReset = () => {
    setIsSearching(false);
    setSearchParams({ author: '', category: '', title: '' });
    setCurrentPage(1); // حتى يعيد جلب الصفحة الأولى من كل الكتب
  };
  const searchBooksWithPagination = async (
    params: { author: string; category: string; title: string },
    page: number
  ) => {
    const queryParams = new URLSearchParams({
      ...params,
      page: page.toString(),
    }).toString();

    const cashKey = `search-${queryParams.toString()}`;
    if (booksCache.current.has(cashKey)) {
      setBooks(booksCache.current.get(cashKey)!);
      return;
    }
    try {
      setError("");
      setSearching(true);
      const response = await booksServices.searchBooks(queryParams);

      if (response?.status === 200) {
        const books =response?.data?.books
        booksCache.current.set(cashKey,books); 
        setBooks(books);
        setPagination(response?.data?.pagination);
       
      } else if (response?.status === 404) {
        setError("There are no books ");
      } else {
        setError("There may be a problem , Please try again");
      }
    } catch (error) {
      console.error(error);
      setError("There may be a problem , Please try again");
    } finally {
      setSearching(false);
    }
  };

  useEffect(() => {
    if (isSearching) {
      searchBooksWithPagination(searchParams, currentPage);
    } else {
      getBooks(currentPage);
    }
  }, [getBooks, currentPage, searchParams]);

  return (
    <Box className={"w-100"} sx={{ width: "100%", px: 1 }}>
      
        <BookSearch
          onSearch={handleSearch}
          searchState={searching}
          onReset={handleReset}
        />
     

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
      {lodaing ? (
        <>
          <p style={{ color: "blue", fontSize: "30px" }}>lodaing..</p>
        </>
      ) : (
        <>
          {" "}
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
                    bookId={book.id}
                    IsFavorite={book.is_favorite}
                    IsRead={book.is_read}
                    Update={getBooks}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}

      <Pagination
        count={pagination.last_page}
        page={currentPage}
        onChange={(event, value: number) => setCurrentPage(value)}
        color="primary"
        sx={{ mt: 4, display: "flex", justifyContent: "center" }}
      />
      {openAddBook && (
        <AddBook
          open={openAddBook}
          onClose={handleCloseOpen}
          onUpdate={getBooks}
        />
      )}
    </Box>
  );
}
