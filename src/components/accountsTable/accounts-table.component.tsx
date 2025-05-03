import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  Switch,
  TextField,
} from "@mui/material";
import { usersServices } from "../../ services/api/usersServices";
import { Paper } from "@mui/material";
import { showNotifications } from "../../utils/notifications";
import { useContext } from "react";
import { SidebarContext } from "../Layout";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import DeleteIcon from '@mui/icons-material/Delete';

const SwitchComponent = (params: any) => {
  const userId = params.params.id;
  const [checked, setChecked] = useState(params.params.row.is_active === 1);

  const handleChange = async () => {
    const updateData = async () => {
      try {
        const response = await usersServices.toggleAccountActiveStatus(userId);
        if (response?.status === 200) {
          setChecked(!checked);
          showNotifications(`${response?.data?.message}`, "success");
        }
      } catch (error) {
        console.log(error);
      }
    };
    await updateData();
  };
  return (
    <Switch
      checked={checked}
      onChange={handleChange}
      inputProps={{ "aria-label": "controlled" }}
    />
  );
};

const ChangeRole = (params: any) => {
  const userId = params.params.id;
  const initialChecked = params.params.row.is_admin;
  const [checked, setChecked] = useState(initialChecked);

  const [openDialog, setOpenDialog] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSwitchClick = () => {
    setOpenDialog(true);
  };
  const handleConfirm = async () => {
    setLoading(true);
    const updateData = async () => {
      try {
        const response = await usersServices.changeRole(userId, password);
        if (response?.status === 200) {
          setChecked(!checked);
          showNotifications(`${response?.data?.message}`, "success");
          setOpenDialog(false);
          setPassword("");
        }
      } catch (error) {
        console.log(error);
        showNotifications("please try again", "error");
      } finally {
        setLoading(false);
      }
    };
    await updateData();
  };
  return (
    <>
      <Switch
        checked={checked}
        onChange={handleSwitchClick}
        inputProps={{ "aria-label": "controlled" }}
      />
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>تأكيد تغيير الصلاحيات</DialogTitle>
        <DialogContent>
          <TextField
            label="كلمة المرور"
            type={showPassword ? "text" : "password"}
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>إلغاء</Button>
          <Button onClick={handleConfirm} disabled={loading}>
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const paginationModel = { page: 0, pageSize: 5 };

export default function UsersAccountTable() {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstname", headerName: "First name", width: 130 },
    { field: "lastname", headerName: "Last name", width: 130 },
    {
      field: "fullName",
      headerName: "Full name",
      sortable: false,
      width: 130,
      valueGetter: (value, row) =>
        `${row.firstname || " "} ${row.lastname || " "}`,
    },
    { field: "email", headerName: "Email", width: 180 },
    { field: "phone", headerName: "phone", width: 180 },
    { field: "gender", headerName: "Gender", width: 180 },
    {
      field: "type",
      headerName: "Role",
      width: 130,
      valueGetter: (value, row) => (row?.is_admin ? "admin" : "user"),
    },
    {
      field: "is_active",
      headerName: "profile active",
      width: 150,
      renderCell: (id) => <SwitchComponent params={id} />,
    },
    {
      field: "user-type",
      headerName: "change role",
      width: 150,
      renderCell: (id) => <ChangeRole params={id} />,
    },
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
  ];

  const [deletingState, setDeletingState] = useState(false);
  const [users, setUsers] = useState([]);

  const getUsers = useCallback(async () => {
    try {
      const response = await usersServices.getUsers();
      if (response?.status === 200) {
        setUsers(response?.data?.data?.users);
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
    getUsers();
  }, [getUsers]);

  const context = useContext(SidebarContext);
  if (!context) {
    return null;
  }
  const { open } = context;
  const handleDeleteClick = (id: number) => async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?\nAll associated data will be deleted and this step cannot be undone."
    );
    if (!confirmed) {
      return;
    }
    setDeletingState(true);
    const response = await usersServices.deleteUser(id);
    if (response?.status !== 200) {
      showNotifications(
        "An error occurred while editing. Please try again.",
        "warning"
      );
    } else {
      showNotifications(
        "User has been Deleted.",
        "success"
      );
      getUsers();
    }
    setDeletingState(false);
  };
  return (
    <Paper
      sx={{ marginTop: 5, height: 500, width: open ? "1200px" : "1390px" }}
    >
      <DataGrid
        rows={users}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
      />
    </Paper>
  );
}
