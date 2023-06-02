import React, { useEffect, useState, useMemo,useCallback }  from 'react'

import TableLoader from './TableLoader'
import { makeStyles, useTheme, Theme, createStyles } from '@material-ui/core/styles';

// import styled from 'styled-components'
// import { useTable } from 'react-table'
import axios from "axios";
import {Table}  from './TableLaters';
import { ColumnDef } from '@tanstack/react-table';





const MyServer_lates = "http://localhost:5000"
const date = '2023-01-25'
const resource = 'lates'


export enum InputType {
    None = 'none',
    Text = 'text',
    Select = 'select',
    Date = 'date',
    DateTime = "dateTime"
  }

interface ITablePreloader {
    style?: React.CSSProperties
}

export const TablePreloader: React.FC<ITablePreloader> = ({style}) => {
    return <div style={{marginTop: 16, width: "82vw", ...style}}>{Array(10)
        .fill("")
        .map((e, i) => (
          <TableLoader key={i} style={{ opacity: Number(2 / i).toFixed(1) }} />
        ))}</div>
}

    
    function StringVSBool (a : boolean) : string {
        if (a === true) {
            return "Опоздал(а)"
        }
        if (a === false) {
            return "Опоздания не зафиксировано"
        }
        return ""
    }


const LatesDatagrid = ({_tableData, _resource_to_ask, _date}) => {

    const [loadingData, setLoadingData] = useState(true);
    // const cols = useMemo(
           const cols = useMemo<ColumnDef<any>[]>(
     () => [
       {
         header: 'Имя',
         cell: (row) => row.renderValue(),
         accessorKey: 'name',
       },
       {
         header: 'Опоздание с утра',
         cell: (row) => row.renderValue(),
         accessorKey: 'isMorningLate',
       },
       {
         header: 'Ушел(ушла) раньше вечером',
         cell: (row) => row.renderValue(),
         accessorKey: 'isEveningEarly',
       },
       {
        header: 'Опоздал(а) с обеда',
        cell: (row) => row.renderValue(),
        accessorKey: 'isLateFromDinner',
      },
      {
        header: 'Много курит',
        cell: (row) => row.renderValue(),
        accessorKey: 'isSmokingTooMuch',
      },
     ],
     [] 
    );

            const [data, setData] = useState([])
            const [date , setDate] = useState(_date)

            const [ resource, setResource ] = useState( _resource_to_ask )
            const [ link, setLink ] = useState(MyServer_lates)
            let link_to_fetch = `${link}/${resource}?data=2023-01-25`
            // let link_to_fetch = `${link}/${resource}?data=${date}`
            useEffect(() => {
                async function getData() {
                    setData([])
                  await axios
                    .get(link_to_fetch)
                    .then((response) => {
                        console.log("In return response")
                        return response
                    })
                    .then((response) => {
                      // check if the data is populated
                      console.log("Data is accepted")                      
                    //   console.log(response.data);
                      let items: any = []
                      response.data.forEach(element => {
                        console.log(element)
                        items.push({
                                            name: element.Name,
                                            isMorningLate : StringVSBool(element.IsMorningLate),
                                            isEveningEarly: StringVSBool(element.IsEveningEarly),
                                            isLateFromDinner: StringVSBool(element.IsLateFromDinner),
                                            isSmokingTooMuch: StringVSBool(element.IsSmokingTooMuch),
                        })
                      });
                      console.log("Second log")
                      console.log(items);
                      setData(items);
                      // you tell it that you had the result
                      setLoadingData(false);
                    });
                }
                async function setDate() {
                    
                }
                if (loadingData) {
                  // if the result is not ready so you make the axios call
                  getData();
                }
              }, []);

              return (
                <div className="App">
                  {/* here you check if the state is loading otherwise if you wioll not call that you will get a blank page because the data is an empty array at the moment of mounting */}
                  {loadingData ? (
                    <p>Loading Please wait...</p>
                  ) : (
                    <Table columns={cols} data={data} />
                  )}
                </div>
              );
            
    
}


const newRow = (_name, _isMorningLate, _isEveningEarly, _isLateFromDinner,_isSmokingTooMuch) => {
    return {
        name: _name,
        isMorningLate: _isMorningLate,
        isEveningEarly: _isEveningEarly,
        isLateFromDinner: _isLateFromDinner,
        isSmokingTooMuch: _isSmokingTooMuch,
    }
  }





export default LatesDatagrid