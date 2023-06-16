import React, { useState, useEffect, useMemo } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Button } from '@material-ui/core'
import { GridRowProps } from '@mui/x-data-grid/components'
import { ContactSupportOutlined } from '@material-ui/icons'
import { ColumnDef } from '@tanstack/react-table';
import axios from 'axios'
import myHookAdding from './hooks'




const Table_Data = () => {
  const {setMyAdd, myAdd}  = myHookAdding();

  // let 

  const [tableData, setTableData] = useState([])
  const cols = React.useMemo(() => [
    // { field: 'id', headerName: 'ID' },
    { field: 'number', headerName: 'Номер', width: 100 },
    { field: 'seller', headerName: 'Продавец', width: 200 },
    { field: 'object', headerName: 'Объект продажи', width: 300 },
    { field: 'whogavemax', headerName: 'Последняя ставка', width: 200 },
    { field: 'money', headerName: 'Сумма', width: 100 },
    {
      field: "action",
      headerName: "Сделать ставку",
      sortable: false,
      renderCell: (params) => {
        const onClick = (e) => {
          let data = {
            number: params.row.number,
            whogavemax: localStorage.getItem('login'),
            money: parseInt(params.row.money) + myAdd,
          }
          console.log(data)
          let link_to_fetch = `${process.env.REACT_APP_API_URL}/update`
          axios.post(link_to_fetch, data)
          
        };

        return <Button onClick={onClick}>Сделать ставку</Button>;
      }
      , width: 150
    }

  ], [tableData]);

  let link_to_fetch = `${process.env.REACT_APP_API_URL}/get_table_data`
  const Grid_fill = () => {
    fetch(link_to_fetch)
      .then((data) => data.json())
      .then((data) => {
        console.log(data)
        setTableData(data)
      })
  }



  useEffect(() => {
    Grid_fill()
    // setInterval(Grid_fill, 30000)

  }, [])




  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={tableData}
        columns={cols}
        pageSizeOptions={[12, 25, 50, 100]}
        getRowId={(row: GridRowProps) => row.object}
      />
    </div>
  )
}

export default Table_Data