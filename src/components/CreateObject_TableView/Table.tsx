import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Button } from '@material-ui/core'
import { GridRowProps } from '@mui/x-data-grid/components'
import { ContactSupportOutlined } from '@material-ui/icons'


  
  
  
  const Table_Data = () => {
    const columns = [
        // { field: 'id', headerName: 'ID' },
        { field: 'number', headerName: 'Номер', width: 150 },
        { field: 'seller', headerName: 'Продавец', width: 150 },
        { field: 'object', headerName: 'Объект продажи', width: 150 },
        { field: 'whogavemax', headerName: 'Последняя ставка', width: 200 },
        { field: 'money', headerName: 'Сумма', width: 100 },
        {
            field: "action",
            headerName: "Сделать ставку",
            sortable: false,
            renderCell: (params) => {
              const onClick = (e) => {
                console.log(params.row.object)
              };
        
              return <Button onClick={onClick}>Сделать ставку</Button>;
            }
            , width: 300
        }
       
    
      ]


    const [tableData, setTableData] = useState([])

    let link_to_fetch = `${process.env.REACT_APP_API_URL}/get_table_data`
    useEffect(() => {
      fetch(link_to_fetch)
        .then((data) => data.json())
        .then((data) => setTableData(data))
  
    }, [])
  
    console.log(tableData)
  
    return (
      <div style={{ height: 700, width: '100%' }}>
        <DataGrid
          rows={tableData}
          columns={columns}
            pageSizeOptions={[12,25,50,100]}
            getRowId={(row:GridRowProps) => row.number}
        />
      </div>
    )
  }
  
  export default Table_Data