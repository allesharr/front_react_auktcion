// Table.tsx

import { getCoreRowModel, useReactTable, flexRender } from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';

// import styled from 'styled-components'
import { useTable } from 'react-table'
import { TableContainer } from '@material-ui/core'
import  Date_Picker   from '../Datepicker/Datepicker'

type Props = {
    sideBarOpen: boolean,
  };
const tableFontSize = "0.875rem"
const useStyles = makeStyles<Theme,Props>((theme: Theme) => createStyles({
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

interface ReactTableProps<T extends object> {
 data: T[];
 columns: ColumnDef<T>[];
}

export const Table = <T extends object>({ data, columns }: ReactTableProps<T>) => {
 const table = useReactTable({
   data,
   columns,
   getCoreRowModel: getCoreRowModel(),
 });

 return (
   <div className="flex flex-col">
     <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
       <div className="inline-block min-w-full py-4 sm:px-6 lg:px-8">
         <div className="overflow-hidden p-2">
           <table className="min-w-full text-center">
             <thead className="border-b bg-gray-50">
               {table.getHeaderGroups().map((headerGroup) => (
                 <tr key={headerGroup.id}>
                   {headerGroup.headers.map((header) => (
                     <th key={header.id} className="px-6 py-4 text-sm font-medium text-gray-900">
                       {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                     </th>
                   ))}
                 </tr>
               ))}
             </thead>
             <tbody>
               {table.getRowModel().rows.map((row) => (
                 <tr key={row.id} className='border-b" bg-white'>
                   {row.getVisibleCells().map((cell) => (
                     <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900" key={cell.id}>
                       {flexRender(cell.column.columnDef.cell, cell.getContext())}
                     </td>
                   ))}
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
       </div>
     </div>
   </div>
    

 );
};