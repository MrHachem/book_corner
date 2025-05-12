import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { useState } from "react";
import AutoFixHighTwoToneIcon from "@mui/icons-material/AutoFixHighTwoTone";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";
import { showNotifications } from "../../utils/notifications";
import { useContext } from "react";
import { SidebarContext } from "../Layout";
import DeleteIcon from "@mui/icons-material/Delete";
import { categoriesServices } from "../../ services/categories/categoriesServices";


const paginationModel = { page: 0, pageSize: 5 };
interface Data {
  categories: never[];
  update: () => Promise<void>
}
export default function CategoriesTable(props:Data) {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 130 },
    { field: "name", headerName: "name", width: 130 },
    {
      field: "actions",
      type: "actions",
      headerName: "Delete",
      width: 150,
      cellClassName: "actions",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            key={id}
            icon={<DeleteIcon sx={{color:"#d68d65",fontSize:"28px"}} />}
            label="Delete"
            onClick={handleDeleteClick(Number(id))}
            color="inherit"
            disabled={deletingState}
          />,
        ];
      },
    },
    {
      field: "update",
      headerName: "Update",
      width: 150,
      renderCell: (id) => <UpdateDialog params={id} />,
    },
  ];

  const [deletingState, setDeletingState] = useState(false);

  const context = useContext(SidebarContext);
  if (!context) {
    return null;
  }
  const { open } = context;
  const handleDeleteClick = (id: number) => async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Category?\nAll associated data will be deleted and this step cannot be undone."
    );
    if (!confirmed) {
      return;
    }
    setDeletingState(true);
    const response = await categoriesServices.deleteCategory(id);
    if (response?.status !== 200) {
      showNotifications(
        "An error occurred while editing. Please try again.",
        "warning"
      );
    } else {
      showNotifications("CATEGORY has been Deleted.", "success");
      props.update();
    }
    setDeletingState(false);
  };

  const UpdateDialog = (params: any) => {
    const categoryId = params.params.id;
    const [openDialog, setOpenDialog] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleConfirm = async () => {
      setLoading(true);
      const updateData = async () => {
        try {
          const response = await categoriesServices.updateCategory(
            categoryId,
            categoryName
          );
          if (response?.status !== 200) {
            showNotifications(
                response?.message,
              "error"
            );
            setOpenDialog(false);
          } else {
            showNotifications(`${response?.data}`, "success");
            setOpenDialog(false);
            setCategoryName("");
            props.update();
            
          }
        } catch (error) {
          console.log(error);
          showNotifications("please try again", "error");
        } finally {
          setLoading(false);
        }
      };
      updateData();
    };

    return (
      <>
        <IconButton sx={{color:"#31369d",fontSize:"25px"}} onClick={() => setOpenDialog(true)}>
          <AutoFixHighTwoToneIcon />
        </IconButton>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Update Category's name</DialogTitle>
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
              update
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };

  return (
    <Paper sx={{ marginTop: 2, height: 500, width: open ? "700px" : "900px" }}>
      <DataGrid
        rows={props.categories}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
      />
    </Paper>
  );
}
