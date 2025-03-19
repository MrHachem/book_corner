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

export function BookCardComponent({
  name,
  author,
  category,
  cover,
  bookId,
}: {
  name: string;
  author: string;
  category: string;
  cover?: string;
  bookId: number;
}) {
  const userType = localStorage.getItem("userType");
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/all-books/book/${bookId}`);
  };
  return (
    // @ts-ignore
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
          {(userType === "admin"|| userType === "owner") && (
            <>
              <Tooltip title="Delete Book">
                <IconButton aria-label="delete" onClick={handleNavigate}>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit Book">
                <IconButton aria-label="edit" onClick={handleNavigate}>
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
            <IconButton aria-label="favorite">
              <Favorite />
            </IconButton>
          </Tooltip>
          <Tooltip title="Read">
            <IconButton aria-label="read">
              <BookOpenCheck />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Box>
    </Card>
  );
}
