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
import { authorsServices } from "../../ services/authors/authorsServices";


const paginationModel = { page: 0, pageSize: 5 };
interface Data {
  authors: never[];
  update: () => Promise<void>
}
export default function AuthorsTable(props:Data) {
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
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(Number(id))}
            color="inherit"
            disabled={deletingState}
          />,
        ];
      },
    },
    {
      field: "user-type",
      headerName: "change role",
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
      "Are you sure you want to delete this author?\nAll associated data will be deleted and this step cannot be undone."
    );
    if (!confirmed) {
      return;
    }
    setDeletingState(true);
    const response = await authorsServices.deleteAuthor(id);
    if (response?.status !== 200) {
      showNotifications(
        "An error occurred while editing. Please try again.",
        "warning"
      );
    } else {
      showNotifications("User has been Deleted.", "success");
      props.update();
    }
    setDeletingState(false);
  };

  const UpdateDialog = (params: any) => {
    const authorId = params.params.id;
    const [openDialog, setOpenDialog] = useState(false);
    const [authorName, setAuthorName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleConfirm = async () => {
      setLoading(true);
      const updateData = async () => {
        try {
          const response = await authorsServices.updateAuthor(
            authorId,
            authorName
          );
          if (response?.status !== 200) {
            showNotifications(
              "An error occurred while editing. Please try again.",
              "warning"
            );
            setOpenDialog(false);
          } else {
            showNotifications(`${response?.data}`, "success");
            setOpenDialog(false);
            setAuthorName("");
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
        <IconButton onClick={() => setOpenDialog(true)}>
          <AutoFixHighTwoToneIcon />
        </IconButton>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Update author's name</DialogTitle>
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
        rows={props.authors}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
      />
    </Paper>
  );
}
