import React from 'react'
import { Button, IconButton, Typography, Tooltip, Fab, useMediaQuery, FormControl, FormControlLabel, Checkbox } from '@material-ui/core'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { useNavigate } from 'react-router-dom';
import { mdiFilterOff } from '@mdi/js';
import Icon from '@mdi/react';
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { Link } from 'react-router-dom'
import CustomDialog from '../Common/CustomDialog'
import { ViewWeek } from '@material-ui/icons';

type Props = {
    sideBarOpen: boolean,
    title: string
};

const useStyles = makeStyles<Theme, Props>(theme =>
    createStyles({
    actionsToolbar: {
        display: "flex",
        alignItems: "center",
        flexWrap: "nowrap",
        width: "100%",
        flexGrow: 1,
        justifyContent: "space-between",
        '@media screen and (max-width: 1200px)': {
            justifyContent: "start"
        },
    },
    actions: {
        display: "flex",
        flexWrap: "nowrap",
        alignItems: "center",
        '& > button': {
            marginRight: 16,
        }
    },
    title: {
        padding: "6px 8px", 
        fontSize: "1rem", 
        letterSpacing: "0.02857em", 
        whiteSpace: "nowrap", 
        overflow: "hidden"
    }
}))

const TableColumnsSelector = ({ columns, setColumns, tableData }) => {
    

    const handleChange = (e) => {

        const { name, checked } = e.target

        if (checked) setColumns(values => values.filter(value => value !== name)) 
        
        else {
            if (tableData.length - columns.length > 1) setColumns(values => [...values, name ])
        } 
        
    }

    return (
        <>
        <FormControl component="fieldset">
            {
                tableData.map(row => {
                    return <FormControlLabel
                                    key={row.id}
                                    control={
                                    <Checkbox
                                        checked={!columns.includes(row.id)}
                                        onChange={e => { 
                                            handleChange(e)
                                        }}
                                        name={row.id}
                                        color="primary"
                                    />
                                    }
                                    label={row.label}
                                />
                }) 
            }

        </FormControl>
        </>
    )
}

const CreateButton = ({basePath}) => {
    
    const navigate = useNavigate()
    // return  (
    //         <Tooltip title="Создать" placement='right'>
    //             <IconButton onClick={()=>navigate(`${basePath}/create`)} color="primary">
    //                 <AddIcon/>
    //             </IconButton>
    //         </Tooltip>
    // )
    
        return <Button
        onClick={()=>navigate(`${basePath}/create`)}
        variant="contained"
        color="primary"
        size="small"
        endIcon={<AddIcon/>}>
            Создать
        </Button>
}


interface IToolbarActions {
    basePath: string | undefined,
    clearInputValues: () => void,
    create: boolean | undefined,
    title: string,
    tableData, 
    columns,
    setColumns
}

const ToolbarActions: React.FC<IToolbarActions> = ({ 
                          basePath,
                          clearInputValues, 
                          create, 
                          title,
                          tableData, 
                          columns,
                          setColumns
                        }) => {
    
    const { sideBarOpen } = useTypedSelector(state => state.application)

    const classes = useStyles({sideBarOpen, title})

    const[open, setOpen] = React.useState(false)

    return (
        <div className={classes.actionsToolbar}>
            {
                title  ? <Typography className={classes.title}>{title}</Typography> : <div></div>
            }
            <div className={classes.actions}>
                 
                 <Button 
                    startIcon={<Icon 
                        path={mdiFilterOff}
                        size={1}/>} 
                    color='primary' 
                    onClick={clearInputValues} 
                    style={{whiteSpace: "nowrap"}}>
                    Cбросить фильтры
                </Button> 

                {/* <IconButton color='primary' onClick={clearInputValues} >
                        <Icon 
                            path={mdiFilterOff}
                            size={1}/>
                </IconButton> */}
                <Button
                    startIcon={<ViewWeek/>} 
                    color='primary' 
                    onClick={()=>setOpen(true)}>
                        Столбцы
                </Button>
                <CustomDialog 
                    open={open} 
                    setOpen={setOpen} 
                    maxWidth="sm"
                    content={ <TableColumnsSelector columns={columns} tableData={tableData} setColumns={setColumns} /> } 
                    />

                { create && (
                            // maxWidth 
                            // ?
                            // <Tooltip title="Создать" placement="right">
                            // <Fab size="small" color="primary" component={Link} to={`${basePath}/create`} style={{position: "fixed", left: 50, bottom: 35}}>
                            //     <AddIcon />
                            // </Fab>
                            // </Tooltip>
                            // :
                            <CreateButton basePath={basePath}/>
                            )
                        }

            </div>
        </div>
    )
}

export default ToolbarActions