import React from 'react';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ToolbarActions from './ToolbarActions'
import { tableData } from '../Events/EventsTable';

const useToolbarStyles = makeStyles((theme) => {
    return {
    gutters: {
      paddingLeft: 16,
      paddingRight: 16,
      borderRadius: "4px 4px 0 0",
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.primary.main,
            backgroundColor: lighten(theme.palette.primary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.primary.dark,
          },
    title: {
      flexGrow: 1
    }
  }});

interface ITableToolbar {
  numSelected: number,
  selected: number[] | string[], 
  clearInputValues: () => void,
  resource_api_name: string | undefined,
  basePath: string | undefined,
  children: React.ReactNode,
  create: boolean | undefined,
  title?: any,
  tableData?: any,
  selectedRows?: any,
  setSelectedRows?: any,
  columns?: any,
  setColumns?: any
} 

const DataGridToolbar: React.FC<ITableToolbar> = ({ 
                                                    children,
                                                    numSelected, 
                                                    selected, 
                                                    clearInputValues, 
                                                    resource_api_name,
                                                    basePath, 
                                                    create, 
                                                    title,
                                                    tableData,
                                                    columns,
                                                    setColumns
                                                  }) => {

    const classes = useToolbarStyles();

    return (
      <Toolbar
        className={clsx(classes.gutters, {
          [classes.highlight]: numSelected > 0,
        })}
        variant="dense"
      >
        {numSelected > 0 ? (
          <>
          <div className={classes.title}>
              <Typography color="inherit" variant="subtitle1">
                  {`${numSelected} ${numSelected === 1 ? "выбран" : "выбрано"}`}
              </Typography>
          </div>
          { React.Children.map(children,(child) => {
                    return React.isValidElement(child) ?
                              React.cloneElement(child, {
                                          resource: resource_api_name,
                                          selected,
                                          ...child.props
                              })
                              :
                              null
                      }
                  )
            }
          </>
        ) : (
              <ToolbarActions 
                  clearInputValues={clearInputValues}
                  basePath={basePath}
                  create={create} 
                  title={title}
                  tableData={tableData}
                  columns={columns}
                  setColumns={setColumns}
                  
                  />
        )}
      </Toolbar>
    );
  };
  
export default DataGridToolbar