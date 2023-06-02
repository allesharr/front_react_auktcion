import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from '@mui/material'
import { useMemo, useState, useEffect } from 'react'
import { ColumnDef } from '@tanstack/react-table';
import {Table}  from '../Datagrid/TableLaters';
import axios from 'axios'

// import { DataGrid } from '@mui/x-data-grid';



const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(0),
        display: 'flex',
        flexDirection: 'row',
        
    },
    form: {
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const CreateObject_TableView = () => {
    
    const [values, setValues] = React.useState({
        Number: '',
        Seller: '',
        Object: '',
        WhoGaveMax: '',
        Money: '',
        TimeToOut: '',
    });

    const classes = useStyles();
    const handlePasswordDataChange = password => event  => {
        setValues({...values, [password]: event.target.value})
      }
    const [loadingData, setLoadingData] = useState(true);
    const [data, setData] = useState([])
    //---------------------------------------------------------------
            let link_to_fetch = `${process.env.REACT_APP_API_URL}/get_table_data`
            useEffect(() => {
                async function getData() {
                    setData([])
                  await axios
                    .get(link_to_fetch)
                    .then((response) => {
                      // check if the data is populated
                      console.log("Data is accepted")                      
                    //   console.log(response.data);
                      let items: any = []
                      response.data.forEach(element => {
                        console.log(element)
                        items.push({
                                            number: element.Number,
                                            seller: element.Seller,
                                            object: element.Object,
                                            whogavemax: element.WhoGaveMax,
                                            money: element.Money,
                                            timetoout: element.TimeToOut,
                        })
                      });
                    //   console.log("Second log")
                    //   console.log(items);
                      setData(items);
                      // you tell it that you had the result
                      setLoadingData(false);
                    });
                }

                if (loadingData) {
                  // if the result is not ready so you make the axios call
                  getData();
                }
              }, []);

    const submitFunction = async () => { 

    }

    const cols = useMemo<ColumnDef<any>[]>(
        () => [
          {
            header: 'Номер',
            cell: (row) => row.renderValue(),
            accessorKey: 'number',
          },
          {
            header: 'Опоздание с утра',
            cell: (row) => row.renderValue(),
            accessorKey: 'seller',
          },
          {
            header: 'Ушел(ушла) раньше вечером',
            cell: (row) => row.renderValue(),
            accessorKey: 'object',
          },
          {
           header: 'Опоздал(а) с обеда',
           cell: (row) => row.renderValue(),
           accessorKey: 'whogavemax',
         },
         {
           header: 'Много курит',
           cell: (row) => row.renderValue(),
           accessorKey: 'money',
         },
        ],
        [] 
       );


    return (   
<Grid container my={4} spacing ={1}>
    <Grid item xs={6}>
        {/* <Box  bgcolor='primary.light'> item 1</Box> */}
        <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Объект сделки"
                        type="text"
                        onChange={handlePasswordDataChange('Object')}
                        value={values.Object}
                    />
    </Grid>
    <Grid item xs = {6}>
                 <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Цена"
                        type="text"
                        onChange={handlePasswordDataChange('Money')}
                        value={values.Money}
                    />
    </Grid>
    <Grid item xs={12}>
                <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        Выставить лот
                    </Button>
    </Grid>
    <Grid item xs={12}>
               {loadingData ? (
                    <p>Loading Please wait...</p>
                  ) : (
                    <Table columns={cols} data={data} />
                  )}
    </Grid>
    
</Grid>

        )
}

export default CreateObject_TableView