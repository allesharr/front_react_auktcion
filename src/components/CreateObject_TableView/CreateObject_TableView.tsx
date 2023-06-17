import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@mui/material'
import { useMemo, useState, useEffect } from 'react'
import { ColumnDef } from '@tanstack/react-table';
import Table_Data from './Table'

import axios from 'axios'
import  myHookAdding  from './hooks'
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


  // const {isAdmin, setIsAdmin}  = React.useState(false)


  


  const [values, setValues] = React.useState({
    Number: '',
    Seller: '',
    Object: '',
    WhoGaveMax: '',
    Money: '',
    TimeToOut: '',


  });



  function check_valid_digits(input: string) {

    let digits = new RegExp('^[0-9]+$', 'gm')

    let result = digits.test(input)

    return result
  }
  const {setMyAdd, myAdd}  = myHookAdding();
  const classes = useStyles();
  const handlePasswordDataChange = password => event => {
    setValues({ ...values, [password]: event.target.value })
  }
  const handleNumberdDataChange = number => event => {
    setValues({ ...values, [number]: event.target.value })
  }
  const handleSellerDataChange = seller => event => {
    setValues({ ...values, [seller]: event.target.value })
  }
  const handleObjectDataChange = object => event => {
    setValues({ ...values, [object]: event.target.value })
  }
  const handleWhoGaveMaxDataChange = WhoGaveMax => event => {
    setValues({ ...values, [WhoGaveMax]: event.target.value })
  }
  const handleMoneyChange = money => event => {
    let new_str = event.target.value
    let check_result = check_valid_digits(new_str)
    if (check_result) {
      setValues({ ...values, [money]: new_str })
    }
  }
  const handleTimeDataChange = time => event => {
    let new_str = event.target.value
    let check_result = check_valid_digits(new_str)

    if (check_result) {
      setValues({ ...values, [time]: new_str })
    }

  }
  const handleMyAddChange = (e) => {
    setMyAdd(e.target.value)
  }
  const PlusMyAdd = () => {
    setMyAdd(myAdd + 50000)
  }
  const MenosMyAdd = () => {
    if (myAdd > 50000) {
      setMyAdd(myAdd - 50000)
    }
  }

  const SetLot = () => {
    if (values.Object !== '' || values.Money !== '' || values.TimeToOut !== '') {
      
      let data = {
        object: values.Object,
        seller: localStorage.getItem("login"),
        money: parseInt(values.Money),
        tto: parseInt(values.TimeToOut),
      }

      console.log(data)
      let link_to_fetch = `${process.env.REACT_APP_API_URL}/set_lot`
      axios.post(link_to_fetch, data)
    } else {
      console.log('data is not full')
    }
    
  }

  function check_admin() {
    let link_to_fetch = `${process.env.REACT_APP_API_URL}/check_admin/${localStorage.getItem("session_key")}`
    axios.get(link_to_fetch).then(data => {
      console.log(data)})
    }

  useEffect(() => {
    check_admin()

  }, [])

  // const [loadingData, setLoadingData] = useState(true);
  // const [data, setData] = useState([])
  //---------------------------------------------------------------




  return (
    <Grid container my={4} spacing={1}>
      <Grid item xs={6}>
        {/* <Box  bgcolor='primary.light'> item 1</Box> */}
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Моя ставка"
          type="text"
          value={myAdd}
        />
      </Grid>
      <Grid item xs={2}>
        <Button
          onClick={PlusMyAdd}
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}>
          +50000
        </Button>
      </Grid>
      <Grid item xs={2}>
        <Button
          onClick={MenosMyAdd}
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}>
          -50000
        </Button>
      </Grid>

      <Grid item xs={4}>
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
      <Grid item xs={4}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Цена"
          type="text"
          onChange={handleMoneyChange('Money')}
          value={values.Money}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Время в секундах"
          type="text"
          onChange={handleTimeDataChange('TimeToOut')}
          value={values.TimeToOut}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={SetLot}
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}>
          Выставить лот
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Table_Data sum={myAdd}/>
      </Grid>

    </Grid>

  )
}

export default CreateObject_TableView