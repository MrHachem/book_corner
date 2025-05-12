import { useCallback, useEffect, useState } from "react";
import { showNotifications } from "../../utils/notifications";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AuthorsTable from "../../components/authorsTable/authors-table.component";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import { AddBox } from "@mui/icons-material";
import { authorsServices } from "../../ services/authors/authorsServices";

export function AuthorsPage() {
  const [authors, setAuthors] = useState([]);
  const userType = localStorage.getItem("userType");
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      showNotifications("Cannot accsess to authors page", "warning");
      showNotifications("please signin if you have an account", "warning");
      navigate("/auth/login");
    }
    if (token) {
      if (userType === "user") {
        showNotifications("Cannot accsess to authors page", "warning");
        navigate("/all-books");
      }
    }
  }, [navigate, token, userType]);

  const getAuthors = useCallback(async () => {
    try {
      const response = await authorsServices.allAuthors();
      if (response?.status === 200) {
        setAuthors(response?.data?.authors);
      } else {
        showNotifications(
          "perhaps there was an error, please refrech the page.",
          "warning"
        );
      }
    } catch (error) {
      console.log("error");
    }
  }, []);

  useEffect(() => {
    getAuthors();
  }, [getAuthors]);

  const [openDialog, setOpenDialog] = useState(false);
    const [authorName, setAuthorName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleConfirm = async () => {
      setLoading(true);
      const addData = async () => {
        try {
          const response = await authorsServices.createAuthor(authorName);
          if (response?.status !== 200) {
            showNotifications(
              response?.message,
              "warning"
            );
          } else {
            showNotifications(`${response?.data}`, "success");  
            getAuthors();
          }
        } catch (error) {
          console.log(error);
          showNotifications("please try again", "error");
        } finally {
          setOpenDialog(false);
          setAuthorName("");
          setLoading(false);
        }
      };
      addData();

    return (
      <>
   
      </>
    );
  };

  return (
    <>
      <IconButton onClick={()=>setOpenDialog(true)}>
        <AddBox />
      </IconButton>
      <AuthorsTable authors={authors} update={getAuthors} />;

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Add author</DialogTitle>
          <DialogContent>
            <TextField
              label="author's name"
              fullWidth
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>cancel</Button>
            <Button onClick={handleConfirm} disabled={loading}>
              Add
            </Button>
          </DialogActions>
        </Dialog>
    </>
  );
}
