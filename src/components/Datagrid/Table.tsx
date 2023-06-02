import React, { useState, useCallback, useEffect } from 'react';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { TextField, InputAdornment, FormControl, MenuItem, Select } from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import ClearIcon from '@material-ui/icons/Clear';
import DateRangePicker from './DateRangePicker'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import clsx from 'clsx';
import Dividers from './Dividers'
import { useDebouncedCallback } from 'use-debounce';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import TableToolbar from './TableToolbar' 
import { useTypedSelector } from '../../hooks/useTypedSelector';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { IEnhancedTable, IEnhancedTableHead, IEnhancedTableData, IEnhancedTableActions } from '../../types/components/Datagrid'
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';

export const tableFontSize = "0.875rem"

type Props = {
  sideBarOpen: boolean,
};


export const useStyles = makeStyles<Theme, Props>((theme: Theme) => createStyles({
        paper: {
          height: "85vh",
          width: "100%",
          position: "relative",
          marginTop: 16,
          fontWeight: "bold",
          boxSizing: "border-box",
          borderRadius: 4,
          // display: "flex",
          // flexDirection: "column"
          // backgroundColor: theme.palette.type === "dark" ? "#212121" : 'inherit',
        },
        tableContainer: {
          overflowX: "auto",
          maxHeight: 'calc(100% - 100px)',
        },
        gutters: {
            paddingLeft: "8px",
            paddingRight: "8px"
        },
        visuallyHidden: {
          border: 0,
          clip: 'rect(0 0 0 0)',
          height: 1,
          margin: -1,
          overflow: 'hidden',
          padding: 0,
          position: 'absolute',
          top: 20,
          width: 1,
        },
        tableHeaders: {
          whiteSpace: "nowrap",
          maxWidth: 150,
          boxSizing: "border-box",
          fontWeight: 350
        },
        tableFonts: {
          fontSize: tableFontSize
        },
        stickyHeader: {
          left: "initial",
          // backgroundColor: theme.palette.type === "dark" ? "#212121" : 'inherit'
        },
        rowStyle: {
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.07) !important"
          },
        },
        expandRowStyle: {
          '& > *': {
            borderBottom: 'initial',
          }
        },
        tableInputs: {
          paddingRight: 8,
          paddingLeft: 12
        },
        tableCell: {
          padding: "3px 12px 3px 12px"
        },
        dataTableCell: {
          whiteSpace: "normal",
          fontWeight: 350,
          minWidth: 40,
          overflowX: "hidden",
          boxSizing: 'border-box'
        },
        dataTable: {
          maxWidth: 150,
          overflowX: "hidden",
          textOverflow: "ellipsis"
        },
        tablePagination: {
          minHeight: 52,
          position: "absolute", 
          bottom: 0, 
          right: 0,
          overflow: "hidden",
          '@media screen and (max-width: 1400px)': {
            left: ({sideBarOpen}) => sideBarOpen ? 0 : 'initial',
            right: ({sideBarOpen}) => sideBarOpen ? "initial" : 0
          },
          // '@media screen and (max-width: 1500px)': {
          //   position: "fixed",
          //   top: "calc(100vh - 64px - 28px - 12px)",
          //   bottom: "initial"
          // },
          // '@media screen and (max-width: 800px)': {
          //   position: "absolute",
          //   left: 0,
          //   bottom: 0,
          //   top: "initial",
          //   right: "initial"
          // }
        },
        clearIcon: {
          marginRight: 0
          },
        textInput: {
          // minWidth: 50
        },
        select: {
            "& .MuiSelect-select": {
              paddingRight: "10px"
            }
        },
        icon: {
          fontSize: "1rem"
        }
      })
)

const EnhancedTableHead: React.FC<IEnhancedTableHead> = ({ 
                              classes, 
                              onSelectAllClick, 
                              order,
                              count,
                              orderBy, 
                              numSelected, 
                              rowCount, 
                              onRequestSort, 
                              tableData,
                              handleInputChange, 
                              handleSelectChange,
                              clearInput,
                              bulkActions,
                              inputValues,
                              setDateRangePicker,
                              customActionsArray,
                              setDateRangePickerPosition,
                              rowExpand,
                              columnsWidth,
                              setColumnsWidth,
                              dataLength,
                              resourse,
                              columns
                            }) => {
                              
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const [height, setHeight] = useState(38.375)

  const tableDataWithSettings = React.useMemo(() => {

    const value = tableData.filter(({ id }) => {

      return !columns?.includes(id) 
    
    })

    return value

  },[columns, tableData])

  // let refs =  React.useRef(new Array(tableData.length).fill(React.createRef()))

  let refs: any =  React.useRef(tableData.map(el => React.createRef()))

  const currentColumnsWidth = localStorage.getItem('columnsWidth')
  let columnswidth = { }
  if (currentColumnsWidth) columnswidth = JSON.parse(currentColumnsWidth)

  const getDividers = () => {

    return tableData.reduce((prev,curr,i) => {
      let width
      if (columnswidth && columnswidth[resourse] && columnswidth[resourse][curr.id]) {
        width = columnswidth[resourse][curr.id]
      }

      else if (refs.current[i].current) width = curr.width || refs.current[i].current.getBoundingClientRect().width
      
      return {
        ...prev,
        [curr.id]: {
          diffX: 0,
          dragging: false,
          left: 0,
          width 
            }
          }
        }, {}
      )
  }

  const resetDividers = () => {
    return tableData.reduce((prev,curr,i) => {
      let width
      if (columnswidth && columnswidth[resourse] && columnswidth[resourse][curr.id]) {
        width = columnswidth[resourse][curr.id]
      }

      let currentId
      if (width) currentId = {
        diffX: 0,
        dragging: false,
        left: 0,
        width 
          }

      return {
        ...prev,
        [curr.id]: currentId
          }
        }, {}
      )
}
      
  const resizeHandler = useDebouncedCallback(() => {
      setColumnsWidth(resetDividers(),() => {
              setColumnsWidth(getDividers())
      })
  }, 250);
  
    useEffect(() => {
      window.addEventListener('resize', resizeHandler);
      return () => {
        window.removeEventListener('resize', resizeHandler);
      };
    }, [resizeHandler]);

    useEffect(() => {
        const dividers = getDividers()
        setColumnsWidth(dividers)
    },[])


    const ref = useCallback( node => {
      if (node !== null) {
        setHeight(node.getBoundingClientRect().height);
      }
    }, []);

    return (
      <TableHead>
        <TableRow ref={ref}>
        { bulkActions && <TableCell padding="checkbox" classes={{stickyHeader: classes.stickyHeader}}>
          <Checkbox

            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell> }
        {
          dataLength > 0 && rowExpand ? <TableCell style={{width: 42}} padding = "normal" className={classes.tableHeaders} classes={{stickyHeader: classes.stickyHeader}}></TableCell> : null
        }
        {tableDataWithSettings.map(({id, label },index) => (
          <TableCell
            key = { id }
            padding="normal"
            ref={refs.current[index]}
            sortDirection={orderBy === id ? order : false}
            size="small"
            style = {columnsWidth[id] && {
                      width: columnsWidth[id].width + columnsWidth[id].left,
                      maxWidth: columnsWidth[id].width + columnsWidth[id].left,                     
                    }}
            className={clsx(classes.tableHeaders, classes.tableFonts)}
            classes={{stickyHeader: classes.stickyHeader}}
            >
            <TableSortLabel
              active={orderBy === id}
              direction={orderBy === id ? order : 'asc'}
              onClick={createSortHandler(id)}
            >
              
              {label}
              {orderBy === id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
              
            </TableSortLabel>
            <Dividers position={columnsWidth} setPosition={setColumnsWidth} resourse={resourse} id={id} count={count}/>
          </TableCell>
        ))}
        {
          customActionsArray ? customActionsArray.map((el,index) => {
            return <TableCell key={index} padding = "normal" classes={{stickyHeader: classes.stickyHeader}}></TableCell>
          }) : null
        }
        <TableCell padding = "none" classes={{stickyHeader: classes.stickyHeader}}></TableCell>
      </TableRow>

      <TableRow hover>
          { 
          bulkActions &&
          <TableCell padding="normal" style={{ top: height }} classes={{stickyHeader: classes.stickyHeader}}>
            <FilterListIcon />
          </TableCell> 
                            }
               
                   {
          dataLength > 0 && rowExpand && <TableCell padding = "normal" style={{ top: height}} classes={{stickyHeader: classes.stickyHeader}}></TableCell> 
        }                 
          {
            tableDataWithSettings.map( ({id, inputType, inputHandler, inputValueHandler, variants}) => {
              return <TableCell 
                        key={id} 
                        padding="normal" 
                        className={clsx(classes.tableHeaders,classes.tableInputs)}
                        classes={{stickyHeader: classes.stickyHeader}}
                        style = {columnsWidth[id] ? {
                            width: columnsWidth[id].width + columnsWidth[id].left,
                            maxWidth: columnsWidth[id].width + columnsWidth[id].left,
                            // minWidth: columnsWidth[id].width + columnsWidth[id].left,
                            top: height 
                          } : {top: height }}
                        >
              {
                inputType === "none" && <></>
              }
              {
                inputType === "text" && 
                  <TextField 
                    fullWidth
                    onChange={e => handleInputChange(e, inputHandler)} 
                    autoComplete="false" 
                    className={clsx(classes.textInput, classes.tableFonts)}
                    name={id}
                    value={ inputValues[id] || ""}
                    multiline={true}
                    size="small"
                    // margin="dense"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start" classes={{positionStart: classes.clearIcon}}>
                          <IconButton size="small" onClick={e => clearInput(id)}>
                              <ClearIcon className={classes.icon}/>
                          </IconButton>
                        </InputAdornment>
                      ),
                      style: {fontSize: tableFontSize}
                    }}                
                    />
                    }
                { inputType === "select" &&
                  <FormControl fullWidth>
                  <Select
                      name={id}
                      value={inputValues[id] ?? "_all"}
                      onChange={handleSelectChange}
                      className={clsx(classes.tableFonts,classes.select)}>
                      <MenuItem value={"_all"} className={classes.tableFonts} selected>Все</MenuItem>
                      {
                        variants.map(({id, name}, index) => {
                          return <MenuItem key={index} value={id} className={classes.tableFonts}>{name}</MenuItem>
                        })
                      }
                  </Select>
                </FormControl>
                    }
              {
                inputType === "date" && <><TextField
                                              autoComplete="false" 
                                              name={id}
                                              value={ 
                                                inputValueHandler(inputValues[id]?.date_from, inputValues[id]?.date_to) ||
                                                ""
                                              }
                                              size="small"
                                              fullWidth
                                              className={classes.tableFonts}
                                              // margin="dense"
                                              multiline
                                              InputProps={{
                                                endAdornment: (
                                                  <InputAdornment position="start">
                                                    {(inputValues[id]?.date_from || inputValues[id]?.date_to) 
                                                    
                                                    &&

                                                    <>
                                                    <IconButton size="small" onClick={e => clearInput(id)}>
                                                        <ClearIcon className={classes.icon}/>
                                                    </IconButton> 
                                                    {/* <IconButton size="small">
                                                      <CalendarTodayIcon className={classes.icon}/>
                                                    </IconButton> */}
                                                    </>

                                                  }
                                                    <IconButton
                                                        onClick={(e) => {
                                                          const x = e.clientX
                                                          const y = e.clientY
                                                          setDateRangePicker(values => ({...values,[id]: true}))
                                                          setDateRangePickerPosition(values=>({...values, [id]: { x,y }}))
                                                        }
                                                      }
                                                      size="small"
                                                      >
                                                        <CalendarTodayIcon className={classes.icon}/>
                                                    </IconButton>           
                                                  
                                                  </InputAdornment>
                                                ),
                                                style: {fontSize: tableFontSize}
                                    }}/>
                </>
              }
            </TableCell>
            })
          }
        {
          customActionsArray ? customActionsArray.map((el,index) => {
            return <TableCell key={index} padding = "normal" classes={{stickyHeader: classes.stickyHeader}} style={{ top: height }}></TableCell>
          }) : null
        }
        <TableCell padding = "none" classes={{stickyHeader: classes.stickyHeader}} style={{ top: height }}></TableCell>
        </TableRow>
    </TableHead>
  );
}


const EnhancedTable: React.FC<IEnhancedTable> = ({
                                        rows,
                                        selected,
                                        setSelected,
                                        order,
                                        setOrder,
                                        orderBy,
                                        count,
                                        page,
                                        setPage,
                                        rowsPerPage,
                                        setRowsPerPage,
                                        tableData,
                                        handleInputChange,
                                        handleSelectChange,
                                        clearInput,
                                        clearInputValues,
                                        inputValues,
                                        handleDateRangeChange,
                                        create,
                                        edit,
                                        resourse,
                                        basePath,
                                        resource_api_name,
                                        bulkActions,
                                        title, 
                                        customActions,
                                        rowStyle,
                                        rowClick,
                                        style,
                                        rowExpand,
                                        isRowExpandable,
                                        toolbarActions
                                    }) => {                              

  const { sideBarOpen } = useTypedSelector(state => state.application)
  
  const maxWidth = useMediaQuery(`(max-width: 1200px)`);

  const classes = useStyles({sideBarOpen});
  
  
  // const [dense, setDense] = useState(false);

  const [columnsWidth, setColumnsWidth] = useStateWithCallbackLazy([])
  const [columnsSelectorOpen, setColumnsSelectorOpen] = useState(false)

  const[columns, setColumns] = useState(() => {
    
    let tableColumns = {}
    const values = localStorage.getItem("hiddenColumns_skud")
    
    if (values) tableColumns = JSON.parse(values)

    if (!tableColumns[resourse]) {
      tableColumns[resourse] = []
    } 

    return tableColumns[resourse]

  })

  useEffect(() => {

    let tableColumns = {}
    const values = localStorage.getItem("hiddenColumns_skud")
    
    if (values) {
      tableColumns = JSON.parse(values)

    } 

    if (resourse !== "") localStorage.setItem("hiddenColumns_skud", JSON.stringify({...tableColumns, [resourse]: columns}))

  },[columns, resourse])

  let customActionsArray
  
  if (customActions) { 
    const customActionsLength = React.Children.toArray(customActions).length
    customActionsArray = new Array(customActionsLength).fill("customAction")
  }

  const[open,setOpen] = useState(() => {
      let initialState = {}
      if (rows) initialState = rows.reduce((obj, row) => {
          obj[row.id] = false
          return obj
      },{})
      return initialState
  })

  const[selectedRows, setSelectedRows] = useState(false)

  const[dateRangePicker, setDateRangePicker] = useState({})
  const[dateRangePickerPosition, setDateRangePickerPosition] = useState({})

  const isSelected = useCallback((name) => selected.indexOf(name) !== -1,[selected])

  const handleClick = useCallback((event, name) => {

    if (event.target.tagName === "BUTTON") return

    const selectedIndex = selected.indexOf(name);
    let newSelected: any[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  },[selected])

  

  if (!rows) return null

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(property, isAsc ? 'desc' : 'asc');
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      let newSelecteds: any[] = []
      if (rows) {
        newSelecteds = rows.map(({id}) => id);
      }
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage+1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  // const handleChangeDense = (event) => {
  //   setDense(event.target.checked);
  // }


  return (
      <Paper className={classes.paper} style={{width: sideBarOpen ? "84vw" : "94vw", ...style}}>
      <TableToolbar
            clearInputValues={clearInputValues}
            numSelected={selected.length}
            basePath={basePath}
            resource_api_name={resource_api_name}
            create={create}
            title={title}
            selectedRows = {selectedRows}
            selected = { selected }
            setSelectedRows = { setSelectedRows }
            tableData={tableData}
            columns={columns}
            setColumns={setColumns}
            >
              {toolbarActions}
        </TableToolbar>
  
        <TableContainer className={classes.tableContainer}>
          <Table
            stickyHeader
            aria-labelledby="tableTitle"
            size="small"
            // size={
            //   dense ? 'small' : 
            // 'medium'}
            aria-label="enhanced table"> 
            <EnhancedTableHead
                tableData={tableData}
                classes={classes}
                numSelected={selected.length}
                count={rows.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                handleInputChange={handleInputChange}
                inputValues={inputValues}
                clearInput={clearInput}
                handleSelectChange={handleSelectChange}
                bulkActions={bulkActions}
                setDateRangePicker={setDateRangePicker}
                setDateRangePickerPosition={setDateRangePickerPosition}
                resourse={resourse}
                rowExpand={rowExpand}
                customActionsArray={customActionsArray}
                columnsWidth={columnsWidth}
                dataLength = {rows.length}
                setColumnsWidth={setColumnsWidth}
                columns={columns}
                />
                <TableData
                      rows = {rows}
                      columns={columns}
                      tableData = { tableData }
                      resourse={resourse}
                      bulkActions={bulkActions}
                      customActions={customActions}
                      rowStyle={rowStyle}
                      rowClick={rowClick}
                      rowExpand={rowExpand}
                      open={open}
                      edit={edit}
                      setOpen={setOpen}
                      basePath={basePath}
                      isSelected={isSelected}
                      handleClick={handleClick}
                      classes={classes}
                      columnsWidth={columnsWidth}
                      customActionsArray={customActionsArray}
                      isRowExpandable={isRowExpandable}
                      selectedRows={selectedRows}
                      />
          </Table>
        </TableContainer>
        <TablePagination
          count={count ? count : 0}
          backIconButtonText="Предыдущая страница"
          nextIconButtonText="Следующая страница"
          draggable={false}
          className={classes.tablePagination}
          rowsPerPageOptions={[ 25, 50 ]}
          component="div"
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Строк на странице"
          ActionsComponent={TablePaginationActions}
          style={maxWidth ? { left: 0, right: "initial" } : undefined}
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} из ${count !== -1 ? count :`больше чем ${to}`}`}
        /> 
         {
           tableData.map(({ id, label }) => {
             return dateRangePicker[id] ? 
              <DateRangePicker 
                handleDateRangeChange={handleDateRangeChange} 
                setDateRangePicker={setDateRangePicker} 
                dateRangePickerPosition={dateRangePickerPosition[id]} 
                fieldName={id}
                label={label}
                key={id}
                />
             :
             null
           })
          }
          {/* {
            columnsSelectorOpen && <ColumnsSelector open={setColumnsSelectorOpen} setOpen={setColumnsSelectorOpen}/>
          } */}
      </Paper>
  );
}

const TableData: React.FC<IEnhancedTableData> = React.memo(
                      ({
                      rows,
                      resourse,
                      bulkActions,
                      customActions = null,
                      rowStyle,
                      rowClick,
                      edit,
                      basePath,
                      rowExpand,
                      open,
                      setOpen,
                      isSelected,
                      handleClick,
                      classes,
                      columnsWidth,
                      customActionsArray,
                      isRowExpandable,
                      selectedRows,
                      columns,
                      tableData
                      }) => { 

  const theme = useTheme()

  const tableDataWithSettings = React.useMemo(() => {

    const value = tableData.filter(({ id }) => {

      return !columns?.includes(id) 
    
    })

    return value

  },[columns, tableData])

  const navigate = useNavigate()

  return <TableBody>
  {rows ? rows.map((row, index) => {
    if (!row) return null
    const isItemSelected = isSelected(row.id);
    if (selectedRows && !isItemSelected) return null
    const labelId = `enhanced-table-checkbox-${index}`;

    return (  
      <React.Fragment key={row.id}>
      <TableRow
        hover
        className={(rowExpand && isRowExpandable) ? (isRowExpandable(row) && clsx(classes.rowStyle, classes.expandRowStyle)) : classes.rowStyle}
        onClick={(e) =>  {
                        if (rowClick) rowClick(row)
                      }}
        // role="checkbox"
        onDoubleClick={(e) => {
          e.preventDefault()
          if (edit) navigate(`${basePath}/${row.id}/edit`)
        }}
        aria-checked={isItemSelected}
        tabIndex={-1}
        selected={isItemSelected}
        style={rowStyle ? rowStyle(row, theme) : {}}>

       { bulkActions && <TableCell padding="checkbox" classes={{sizeSmall: classes.tableCell}}>
          <Checkbox
            onClick={(event) =>  {
              if (bulkActions) handleClick(event, row.id)
            }}
            color="primary"
            checked={isItemSelected}
            inputProps={{ 'aria-labelledby': labelId }}
          />
        </TableCell> }

        { rowExpand && isRowExpandable &&
          ((isRowExpandable(row)  ? <TableCell>
          <IconButton size="small" onClick={() => setOpen(values => ({...values, [row.id]: !open[row.id]}))}>
            {open[row.id] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell> : <TableCell></TableCell>))
         }
        
        {
          tableDataWithSettings.map(({ id, dataHandler }) => 
                  <TableCell classes={{sizeSmall: clsx(classes.tableCell, classes.dataTableCell)}} key={id} padding="normal">
                  <div 
                    className={clsx(classes.dataTable,classes.tableFonts)}
                    
                    style = {columnsWidth[id] && {
                      width: columnsWidth[id].width + columnsWidth[id].left - 24,
                      maxWidth: columnsWidth[id].width + columnsWidth[id].left - 24,
                      }}>
                      {
                          dataHandler 
                          ? 
                          dataHandler(row[id]) 
                          : 
                          row[id]
                          }
                    </div>
                    </TableCell>
          )
        }

        <TableActions
            resourse={resourse}
            row={row}
            classes={classes}
            customActions={customActions}
        />

      <TableCell padding = "none"></TableCell>
      </TableRow>
      {
        (rowExpand && isRowExpandable && isRowExpandable(row)) &&
           rowExpand(tableDataWithSettings,row,open[row.id],customActionsArray) 
      }
      </React.Fragment>
    );
  }) : null}
</TableBody>
})

const TableActions: React.FC<IEnhancedTableActions> = React.memo(
                          ({
                          resourse,
                          row,
                          classes,
                          customActions
                        }) => {
                          return <>
                          {
                            customActions ? 
                            React.Children.map(customActions,(child) => {
                              // if (React.isValidElement(child))
                              return <TableCell classes={{sizeSmall: classes.tableCell}} padding="normal" key={row.id}>
                                      {React.cloneElement(child, {
                                          row,
                                          basePath: resourse,
                                          ...child.props
                              })}
                              </TableCell>
                            })
                              :
                              null
                          }
                          </>
                    }
              )

              const useStyles1 = makeStyles((theme: Theme) =>
              createStyles({
                root: {
                  flexShrink: 0,
                  marginLeft: theme.spacing(2.5),
                },
              }),
            );
    
    interface TablePaginationActionsProps {
      count: number;
      page: number;
      rowsPerPage: number;
      onPageChange: (event: React.MouseEvent<HTMLButtonElement>, newPage: number) => void;
    }
    
    const TablePaginationActions = (props: TablePaginationActionsProps) => {
      const classes = useStyles1();
      const theme = useTheme();
      const { count, page, rowsPerPage, onPageChange } = props;
    
      const handleFirstPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, 0);
      };
    
      const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
      };
    
      const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
      };
    
      const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
      };
    
      return (
        <div className={classes.root}>
          <IconButton
            onClick={handleFirstPageButtonClick}
            disabled={page === 0}
            aria-label="first page"
          >
            {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
          </IconButton>
          <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          </IconButton>
          <IconButton
            onClick={handleNextButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="next page"
          >
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </IconButton>
          <IconButton
            onClick={handleLastPageButtonClick}
            disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            aria-label="last page"
          >
            {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
          </IconButton>
        </div>
      );
    }
    

export default EnhancedTable