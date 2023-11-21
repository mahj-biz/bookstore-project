import * as React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

const ReactDataTables = ({ ...props }) => {

    // const rows = [
    //     { id: 1, col1: 'Hello', col2: 'World' },
    //     { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
    //     { id: 3, col1: 'MUI', col2: 'is Amazing' },
    //   ];    
    //   const columns = [
    //     { field: 'col1', headerName: 'Column 1', width: 150 },
    //     { field: 'col2', headerName: 'Column 2', width: 150 },
    //   ];



    const rowsData = props.data;
    const rows = rowsData.map((rowsData) => {
        return { ...rowsData, id: rowsData._id }
    })
    //console.log(rows)
    const VISIBLE_FIELDS = props.vf;
    const columnsData = props.columns;
    //const columns = props.columns;

    //console.log(props)
    const data = { rows: rows, columns: columnsData };

    //console.log(data)

    const columns = React.useMemo(
        () => data.columns.filter((column) => VISIBLE_FIELDS.includes(column.field)),
        [data.columns],
    );


    // return (
    //     <div style={{ height: 300, width: '100%' }}>
    //         <DataGrid rows={rows} columns={columns} />
    //     </div>
    // )


    return (
        <Box sx={{ height: '50%', width: '100%'}}>
            <DataGrid
                {...data}
                disableColumnFilter
                disableColumnSelector
                disableDensitySelector
                disableRowSelectionOnClick
                columns={columns}
                slots={{ toolbar: GridToolbar }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                        printOptions: { disableToolbarButton: true },
                        csvOptions: { disableToolbarButton: true },
                    },
                }}
                pageSizeOptions={[5 , 10 , 25 , 100]} 
            />
        </Box>

    );
}

export default ReactDataTables