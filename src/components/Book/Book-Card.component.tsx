import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import { Favorite } from "@mui/icons-material";
import styles from "./Book-Card.module.css";
import { BookOpenCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCallback, useEffect, useState } from "react";
import EditBook from "./CRUD_book/Edit-Book-component";
import { booksServices } from "../../ services/books/booksServices";
import { showNotifications } from "../../utils/notifications";

export function BookCardComponent({
  name,
  author,
  category,
  cover,
  bookId,
  IsFavorite,
  IsRead,
  Update,
}: {
  name: string;
  author: string;
  category: string;
  cover?: string;
  bookId: number;
  IsFavorite: boolean;
  IsRead: boolean;
  Update: () => Promise<void>;
}) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFavoriteState, setIsFavoriteState] = useState(IsFavorite);
  const [isUpdatingRead, setIsUpdatingRead] = useState(false);
  const [isReadState, setIsReadState] = useState(IsRead);
  const [isDeleting, setIsDeleting] = useState(false);

  const [openEditBook, setOpenEditBook] = useState(false);
  const userType = localStorage.getItem("userType");
  const { token } = useAuth();
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/all-books/book/${bookId}`);
  };
  const handleOpenEdit = () => {
    setOpenEditBook(true);
  };
  const handleCloseEdit = () => {
    setOpenEditBook(false);
  };
   //delete book
    const handleDeleteBook = useCallback(async () => {
      if (!bookId || isDeleting) return;
      setIsDeleting(true);
      try {
        const response = await booksServices.deleteBook(bookId);
        if (response?.status !== 200) {
          showNotifications(
            "An error occurred while editing. Please try again.",
            "warning"
          );
        } else {
          Update();
          navigate(`/all-books`);
        }
      } catch (error) {
        console.error("error", error);
      } finally {
        setIsDeleting(false);
      }
    }, [bookId, isDeleting]);

  const updateFavorite = useCallback(async () => {
    console.log(IsFavorite);
    if (!bookId || isUpdating) return;
    setIsFavoriteState((prev) => !prev);

    setIsUpdating(true);
    try {
      const response = await booksServices.isFavBook(bookId);
      if (response?.status !== 200) {
        showNotifications(
          "An error occurred while editing. Please try again.",
          "warning"
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  }, [bookId, isUpdating]);

  // update Read state

  const updateRead = useCallback(async () => {
    console.log(IsRead);
    if (!bookId || isUpdatingRead) return;
    setIsReadState((prev) => !prev);

    setIsUpdatingRead(true);
    try {
      const response = await booksServices.isReadBook(bookId);
      if (response?.status !== 200) {
        showNotifications(
          "An error occurred while editing. Please try again.",
          "warning"
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdatingRead(false);
    }
  }, [bookId, isUpdatingRead]);

  return (
    //@ts-ignore
    <>
      <Card sx={{ borderRadius: "10px" }} className={styles.bookCard}>
        {/* صورة الكتاب */}
        <CardMedia
          className={styles.hoverImage}
          component="img"
          image={cover}
          alt="Book Image"
        />

        <Box className={styles.hoverBox}>
          <CardHeader
            sx={{
              background: "rgba(255, 255, 255, 0.8)",
              padding: "10px",
              transition: "all 0.3s ease-in-out",
            }}
            avatar={
              <Avatar
                sx={{
                  bgcolor: "#4b7fb2",
                  width: 56,
                  height: 56,
                }}
                aria-label="recipe"
              >
                <img
                  src="/public/fav_icon.png"
                  alt="Avatar"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              </Avatar>
            }
            title={
              <Typography
                variant="h6"
                sx={{ fontFamily: "Cairo, sans-serif", fontSize: "20px" }}
              >
                {name}
              </Typography>
            }
          />

          <CardContent
            sx={{
              background: "rgba(255, 255, 255, 0.8)",
              paddingLeft: "20px",
              transition: "all 0.3s ease-in-out",
            }}
          >
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ fontFamily: "Cairo, sans-serif" }}
            >
              author : {author}
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ fontFamily: "Cairo, sans-serif" }}
            >
              type : {category}
            </Typography>
          </CardContent>

          <CardActions
            sx={{
              background: "rgba(255, 255, 255, 0.8)",
              padding: "10px",
              display: "flex",
              justifyContent: "center",
              transition: "all 0.3s ease-in-out",
            }}
          >
            {token && (userType === "admin" || userType === "owner") && (
              <>
                <Tooltip title="Delete Book">
                    <IconButton aria-label="delete" disabled={!token || isDeleting} onClick={handleDeleteBook}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                <Tooltip title="Edit Book">
                  <IconButton aria-label="edit" onClick={handleOpenEdit}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </>
            )}
            
            <Tooltip title="Book Details">
              <IconButton aria-label="add" onClick={handleNavigate}>
                <ReadMoreIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Add to Favorites">
              <IconButton
                aria-label="favorite"
                disabled={!token || isUpdating}
                onClick={updateFavorite}
              >
                <Favorite
                  sx={{
                    color: isFavoriteState ? "#e61010d4" : "rgb(0 0 0 / 54%)",
                  }}
                />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Add to Read">
              <IconButton
                aria-label="Read"
                disabled={!token || isUpdatingRead}
                onClick={updateRead}
              >
                <BookOpenCheck
                  style={{
                    color: isReadState ? "darkorange" : "rgb(0 0 0 / 54%)",
                  }}
                />
              </IconButton>
            </Tooltip>
          </CardActions>
        </Box>
      </Card>
      {openEditBook && (
        <EditBook
          open={openEditBook}
          onClose={handleCloseEdit}
          bookId={bookId}
          onUpdate={Update}
        />
      )}
    </>
  );
}
