import { useCallback, useEffect, useState } from "react";
import { showNotifications } from "../../utils/notifications";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";
import { AddBox } from "@mui/icons-material";
import CategoriesTable from "../../components/categoriesTable/categories-table.component";
import { categoriesServices } from "../../ services/categories/categoriesServices";

export function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const userType = localStorage.getItem("userType");
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      showNotifications("Cannot accsess to categories page", "warning");
      showNotifications("please signin if you have an account", "warning");
      navigate("/auth/login");
    }
    if (token) {
      if (userType === "user") {
        showNotifications("Cannot accsess to categories page", "warning");
        navigate("/all-books");
      }
    }
  }, [navigate, token, userType]);

  const getCategories = useCallback(async () => {
    try {
      const response = await categoriesServices.allCategories();
      if (response?.status === 200) {
        setCategories(response?.data?.categories);
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
    getCategories();
  }, [getCategories]);

  const [openDialog, setOpenDialog] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleConfirm = async () => {
      setLoading(true);
      const addData = async () => {
        try {
          const response = await categoriesServices.createCategory(categoryName);
          if (response?.status !== 200) {
            showNotifications(
              response?.message,
              "error"
            );
          } else {
            showNotifications(`${response?.data}`, "success");  
            getCategories();
          }
        } catch (error) {
          console.log(error);
          showNotifications("please try again", "error");
        } finally {
          setOpenDialog(false);
          setCategoryName("");
          setLoading(false);
        }
      };
      addData();
  };

  return (
    <>
      <IconButton sx={{color:"#31369d",fontSize:"25px"}} onClick={()=>setOpenDialog(true)}>
        <AddBox />
      </IconButton>
      <CategoriesTable categories={categories} update={getCategories} />

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Add category</DialogTitle>
          <DialogContent>
            <TextField
              label="category's name"
              fullWidth
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
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
