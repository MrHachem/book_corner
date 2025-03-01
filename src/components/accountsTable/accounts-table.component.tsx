import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { Switch } from "@mui/material";
import { usersServices } from "../../ services/api/usersServices";
import { Paper } from "@mui/material";
import { showNotifications } from "../../utils/notifications";
import { useContext } from "react";
import { SidebarContext } from "../Layout";

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
  { field: "type", headerName: "Rule", width: 130 },
  {
    field: "is_active",
    headerName: "تفعيل الحساب",
    width: 150,
    renderCell: (id) => <SwitchComponent params={id} />,
  },
];

const paginationModel = { page: 0, pageSize: 5 };

export default function UsersAccountTable() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUsers = async () => {
      const response = await usersServices.getUsers();
      if (response?.status === 200) {
        setUsers(response?.data?.data);
      }
    };
    getUsers();
  }, []);

  const context = useContext(SidebarContext);
  if (!context) {
    console.error("SidebarContext is undefined! Ensure it's inside Layout.");
    return null;
  }
  console.log("context", context);

  const { open } = context;
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
