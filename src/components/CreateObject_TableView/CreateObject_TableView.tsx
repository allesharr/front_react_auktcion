import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import {Grid} from '@mui/material'
import { useMemo, useState, useEffect } from 'react'
import { ColumnDef } from '@tanstack/react-table';
import Table_Data from './Table'

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
                  <Table_Data/>
    </Grid>
    
</Grid>

        )
}

export default CreateObject_TableView