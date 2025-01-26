import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useState } from 'react';
import { Switch } from '@mui/material';



const SwitchComponent = (params : any) => {

    //const userId = params.params.id;
    console.log('params',params)

    const [checked, setChecked] = useState(params.params.row.account_active === 1);

    const handleChange = async (event : React.ChangeEvent<HTMLInputElement>) => {

        const newActiveState = checked ? 0 : 1;
        console.log(newActiveState);
        setChecked(!checked)

        const updateData = async () => {
            try {
                await console.log('response');
               
            } catch (error) {
                console.log(error)
            }

        };
        await updateData();
    };
    return (
        <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{'aria-label': 'controlled'}}
        />
    );

}


const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'fullName',
    headerName: 'Full name',
    sortable: false,
    width: 130,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
  { field: 'email', headerName: 'Email', width: 180 },
  { field: 'rule', headerName: 'Rule', width: 130 },
  {
    field: 'account_active',
    headerName: 'تفعيل الحساب',
    width: 150,
    renderCell: (id) => <SwitchComponent params={id}/>
},

];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon' , email:'sedra@gmail.com', rule:'user',account_active:1},
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', email:'sedra@gmail.com', rule:'user',account_active:1},
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', email:'sedra@gmail.com', rule:'user',account_active:0},
  { id: 4, lastName: 'Stark', firstName: 'Arya', email:'sedra@gmail.com', rule:'user',account_active:0},
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', email:'sedra@gmail.com', rule:'user',account_active:1},
  { id: 6, lastName: 'Melisandre', firstName: null , email:'sedra@gmail.com', rule:'user',account_active:1},
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', email:'sedra@gmail.com', rule:'user',account_active:0},
  { id: 8, lastName: 'Frances', firstName: 'Rossini', email:'sedra@gmail.com', rule:'user',account_active:1},
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', email:'sedra@gmail.com', rule:'user',account_active:1},
 
];

const paginationModel = { page: 0, pageSize: 5 };

export default function UsersAccountTable() {
  return (
    <Paper sx={{ height: 500, width: '88%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
