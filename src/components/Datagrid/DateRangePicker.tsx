import React, {  useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Card, Typography } from '@material-ui/core'
import { tableFontSize } from './Table'
import { Theme } from "@material-ui/core";
import { checkBrowser } from "../../helpers/helpers";

const tableButtonsFontSize = ".74rem" 

const useStyles = makeStyles<Theme>((theme) => {
  return ({
    card: {
      display: 'flex',
      flexDirection: "column",
      padding: "12px",
      marginTop: "4px",
      position: "fixed",
      zIndex: 10000,
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  buttons: {
    display: "flex",
    justifyContent: 'space-between',
  },
  label: {
    marginBottom: "8px",
    fontSize: tableFontSize
  },
  requestFormButtons: {
    fontSize: tableButtonsFontSize
  }
})});


const CustomDateRangePicker = ({fieldName, handleDateRangeChange, setDateRangePicker, dateRangePickerPosition, label}) => {

  const classes = useStyles();

  const[dateRange,setDateRange] = useState({
    date_from: "",
    date_to: ""
  })

  const handleChange = e => {
    const { name, value } = e.target;
    console.log(value)
    setDateRange( range =>({
        ...range,
        [name]: value 
    }));
};

  return <Card className={classes.card} style={{ top: dateRangePickerPosition.y + 20, left: dateRangePickerPosition.x - 150 }}>
          <Typography className={classes.label}>{label}</Typography>
          <TextField
              label="С"
              type={checkBrowser() ? "date" : "datetime-local"}
              value={dateRange.date_from}
              className={classes.textField}
              name="date_from"
              variant="filled"
              color="primary"
              onChange={handleChange}
              size="small"
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              style: {
                fontSize: tableFontSize
              }
            }}/>
            
            <TextField
              label="По"
              type={checkBrowser() ? "date" : "datetime-local"}
              value={dateRange.date_to}
              className={classes.textField}
              name="date_to"
              variant="filled"
              color="primary"
              onChange={handleChange}
              size="small"
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              inputProps: {max: checkBrowser() ? new Date().toISOString().split("T")[0] : new Date().toISOString().split(".")[0]},
              style: {
                fontSize: tableFontSize
                  }
                }
              }
          />
          <div className={classes.buttons}>
            <div>
            <Button className={classes.requestFormButtons} 
                    color="primary" 
                    size="small" 
                    onClick={() => handleDateRangeChange(dateRange, fieldName)} 
                    disabled={dateRange.date_from === "" || dateRange.date_from === ""}>Задать</Button>
            <Button className={classes.requestFormButtons} 
                    color="primary" 
                    size="small" 
                    onClick={e => setDateRange({date_from: "",date_to: ""})}>Сбросить</Button>
            </div>    
            <Button className={classes.requestFormButtons}
                    color="primary" 
                    size="small" 
                    onClick={e => setDateRangePicker(values=>({...values, [fieldName]: false}))}>Закрыть</Button>
          </div>
  </Card>
}

export default CustomDateRangePicker 