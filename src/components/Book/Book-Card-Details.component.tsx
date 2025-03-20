import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Rating,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import { Favorite } from "@mui/icons-material";
import { BookOpenCheck } from "lucide-react";
import { BookLock } from "lucide-react";
import { booksServices } from "../../ services/books/booksServices";
import { useAuth } from "../../context/AuthContext";
import { showNotifications } from "../../utils/notifications";

interface BookDetails {
  id: number;
  title: string;
  author: string;
  category: string;
  cover: string;
  description: string;
  published_at: string;
  is_favorite: boolean;
  is_read: boolean;
  user_rating: number;
}

export function BookCardDetails() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType");
  const { bookId } = useParams();
  const [book, setBook] = useState<BookDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [ratingValue, setRatingValue] = useState<number | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isUpdatingReading, setIsUpdatingReading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  //get book from bookId
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await booksServices.showBook(Number(bookId));
        const data = response?.data;
        if (response?.status === 404) {
          navigate("*");
        } else if (response?.status === 200) {
          setBook(data?.book);
          setRatingValue(data?.book?.user_rating ?? 0);
        }
      } catch (error) {
        navigate("*");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [bookId, navigate]);

  //update Rating
  const updateRating = useCallback(
    async (newValue: number) => {
      console.log("book?.id", book?.id);
      const prevRating = book?.user_rating ?? 0;
      if (!book || newValue === ratingValue) return;
      try {
        console.log("book?.id", book?.id);
        setRatingValue(newValue);
        const response = await booksServices.rateBook(book?.id, {
          rating: newValue,
        });
        if (response?.status !== 200) {
          showNotifications(
            "An error occurred while editing. Please try again.",
            "warning"
          );
          setRatingValue(prevRating);
        }
      } catch (error) {
        setBook((prev) => prev && { ...prev, user_rating: prevRating });
      }
    },
    [book, ratingValue]
  );

  // update favorite state

  const updateFavorite = useCallback(async () => {
    if (!book || isUpdating) return;
    const prevFav = book?.is_favorite;
    const newFav = !prevFav;

    setBook((prev) => prev && { ...prev, is_favorite: newFav });
    setIsUpdating(true);
    try {
      const response = await booksServices.isFavBook(book?.id);
      if (response?.status !== 200) {
        showNotifications(
          "An error occurred while editing. Please try again.",
          "warning"
        );
        setBook((prev) => prev && { ...prev, is_favorite: prevFav });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  }, [book, isUpdating]);

  // update Read state

  const updateRead = useCallback(async () => {
    if (!book || isUpdatingReading) return;
    const prevReadState = book?.is_read;
    const newReadState = !prevReadState;

    setBook((prev) => prev && { ...prev, is_read: newReadState });
    setIsUpdatingReading(true);
    try {
      const response = await booksServices.isReadBook(book?.id);
      if (response?.status !== 200) {
        showNotifications(
          "An error occurred while editing. Please try again.",
          "warning"
        );
        setBook((prev) => prev && { ...prev, is_read: prevReadState });
      }
    } catch (error) {
      console.error("error", error);
    } finally {
      setIsUpdatingReading(false);
    }
  }, [book, isUpdatingReading]);

  //delete book
  const deleteBook = useCallback(async () => {
    if (!book || isDeleting) return;
    setIsDeleting(true);
    try {
      const response = await booksServices.deleteBook(book?.id);
      if (response?.status !== 200) {
        showNotifications(
          "An error occurred while editing. Please try again.",
          "warning"
        );
      } else {
        navigate(`/all-books`);
      }
    } catch (error) {
      console.error("error", error);
    } finally {
      setIsDeleting(false);
    }
  }, [book, isDeleting]);

  return loading ? (
    <div>Loading...</div>
  ) : (
    <>
      <Grid container spacing={3} sx={{ marginTop: 1 }}>
        {/* قسم صورة الكتاب */}
        <Grid item xs={12} md={4} display="flex" justifyContent="center">
          <Card
            sx={{
              borderRadius: "9px",
              textAlign: "center",
              width: "100%",
              maxWidth: 350,
            }}
          >
            <CardContent
              sx={{
                backgroundImage:
                  "linear-gradient(44deg, #fffefe, #c7c6d6a6, #2f3f5a69 600px)",
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap={2}
              >
                {/* صورة الكتاب */}
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: 290,
                    height: 290,
                    backgroundColor: "white",
                    backgroundImage: `url(${book?.cover})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    borderRadius: "20px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                    transition: "0.3s all ease-in-out",
                    "&:hover": {
                      transform: "scale(1.04)",
                      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.5)",
                    },
                  }}
                ></Box>

                {/* معلومات الكتاب */}
                <Box sx={{ textAlign: "center", width: "100%" }}>
                  <Typography variant="h5" sx={{ color: "#203254" }}>
                    {book?.title}
                  </Typography>
                  <hr />
                  <Typography variant="h6" sx={{ color: "#203254" }}>
                    {book?.author}
                  </Typography>
                  <br />
                  <Rating
                    disabled={!token}
                    name="book_rating"
                    value={ratingValue}
                    onChange={(_, newValue) => updateRating(newValue as number)}
                    precision={1}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* قسم تفاصيل الكتاب */}
        <Grid item xs={12} md={8}>
          <Card
            sx={{
              textAlign: "start",
              padding: 2,
              backgroundImage:
                "linear-gradient(323deg, #e7d6d6, #42454a61, #2f3f5a21 400px)",
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ paddingY: 1, color: "#455f92" }}
              >
                {book?.title}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Date of publication: {book?.published_at}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Type of book : {book?.category}
              </Typography>
              <hr />
              <Typography variant="body1" gutterBottom sx={{ paddingY: 2 }}>
                {book?.description}
              </Typography>
            </CardContent>

            {/* الأزرار */}
            <CardActions
              sx={{ display: "flex", justifyContent: "start", gap: 1 }}
            >
              {token && (userType === "admin" || userType === "owner") && (
                <>
                  <Tooltip title="Delete Book">
                    <IconButton aria-label="delete" onClick={deleteBook}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit Book">
                    <IconButton aria-label="edit">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </>
              )}
              <Tooltip title="Add to Favorites">
                <IconButton
                  aria-label="favorite"
                  disabled={!token || isUpdating}
                  onClick={updateFavorite}
                >
                  <Favorite
                    sx={{
                      color: book?.is_favorite
                        ? "#e61010d4"
                        : "rgb(0 0 0 / 54%)",
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title="Read">
                <IconButton
                  disabled={!token || isUpdatingReading}
                  onClick={updateRead}
                >
                  <BookOpenCheck
                    style={{
                      color: book?.is_read ? "darkorange" : "rgb(0 0 0 / 54%)",
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title="Complete later ">
                <IconButton disabled={!token}>
                  <BookLock style={{ color: "#455769" }} />
                </IconButton>
              </Tooltip>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
