import React, { useEffect, useState, useMemo }  from 'react'
import DataTable from './Table'
import { removeByKey } from "../../helpers/helpers"
import { useDebouncedCallback } from 'use-debounce'
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { UpdateParameters } from '../../types/applicationData/applicationData'
import TableLoader from './TableLoader'
import { IDatagridProps } from '../../types/components/Datagrid'

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




const Datagrid: React.FC<IDatagridProps> = ({
                    tableData, 
                    resource,
                    create,
                    edit,
                    title, 
                    bulkActions,
                    defaultFilterValues = {},
                    toolbarActions, 
                    rowClick, 
                    rowStyle, 
                    rowExpand, 
                    isRowExpandable,
                    children,
                    style, 
                }) => {

    const { fetchData, setSelectedRecords } = useActions()
    const { data, parameters, total, resource_api_name = "", basePath, selected } = useTypedSelector(state => state.applicationData[resource])

    const [inputValues, setInputValues] = useState(parameters.filterValues || {})

    const debounced = useDebouncedCallback(
        (values) => {
            fetchData(resource, resource_api_name, { ...parameters, page: 1, filterValues: { ...values }}, defaultFilterValues)
        },
        500
      );

    const getData = ( updateParameters?: UpdateParameters ) => {
        fetchData(resource, resource_api_name, { ...parameters, ...updateParameters, filterValues: { ...parameters.filterValues }}, defaultFilterValues )
    }


    useEffect(() => getData(), [])

    const handleInputChange = (event, inputHandler) => {
        
        const {value, name} = event.target
        let values
        
        if (value.length === 0) {
            values = removeByKey(inputValues,name) 
        }
        else {
            values = { ...inputValues, [name]: inputHandler ? inputHandler(value) : value }
        } 
            setInputValues(values)
            debounced(values)
    }

    const handleSelectChange = event => {
        const { value, name } = event.target
        let values
        if (value === "_all") {
            values = removeByKey(inputValues,name) 
        }
        else {
            values = { ...inputValues, [name]: value }
        } 
            setInputValues(values)
            debounced(values)
    }

    const handleDateRangeChange = (dateRange, fieldName) => {
        
        const {date_from, date_to} = dateRange

        const date = { [fieldName]: {
            date_from,
            date_to
        }}
        const values = { ...inputValues, ...date}
        setInputValues(values)
        debounced(values)
        // getData({page: 1},values)
    }

    const clearInput = name => {

        let updatedInputValues = inputValues
        let updatedFilterValues = parameters.filterValues
        if (typeof name === "string") {
            updatedInputValues = removeByKey(updatedInputValues, name)
            updatedFilterValues = removeByKey(updatedFilterValues, name)
        } 
        else if (typeof name === "object") {
            for (let key of name) {
                updatedInputValues = removeByKey(updatedInputValues, key)
                updatedFilterValues = removeByKey(updatedFilterValues, key)
            }
        }
        setInputValues(updatedInputValues)
        debounced({ ...updatedFilterValues, ...updatedInputValues})
    }

    const clearInputValues = () => {
        setInputValues({})
        debounced({})
    }

    const setOrder = (orderBy, order) => {
        const params: UpdateParameters = {
            page: 1,
            orderBy,
            order
        }
        getData(params)
    }

    const setPage = (page) => {
        const params: UpdateParameters = {
            page
        }
        getData(params)
    }

    const setRowsPerPage = (perPage) => {
        const params: UpdateParameters = {
            page: 1,
            perPage: perPage,
        }
        getData(params)
    }

    const setSelected = (selected) => {
        setSelectedRecords(resource,selected)
    }

    const rows = useMemo(() => { 
        const ids = Object.keys(data)
        return ids.map( id => { return { ...data[id] }})
    },[data])

    // if (loading) return <TablePreloader/>

    return (
        <DataTable 
            rows={ rows }
            selected={selected} 
            setSelected={setSelected}
            page={parameters.page - 1}
            setPage={setPage}
            rowsPerPage={parameters.perPage}
            setRowsPerPage={setRowsPerPage}
            order={parameters.order}
            orderBy={parameters.orderBy}
            setOrder={setOrder}
            count={ total }
            tableData={tableData}
            handleInputChange={handleInputChange}
            handleSelectChange={handleSelectChange}
            inputValues={inputValues}
            handleDateRangeChange={handleDateRangeChange}
            clearInput={clearInput}
            clearInputValues={clearInputValues}
            resourse={resource}
            resource_api_name={resource_api_name}
            create={create}
            edit={edit}
            bulkActions={bulkActions}
            basePath={basePath}
            customActions={children}
            rowStyle={rowStyle}
            rowClick={rowClick}
            rowExpand={rowExpand}
            style={style}
            isRowExpandable={isRowExpandable}
            title={title}
            toolbarActions={toolbarActions}
            />
    )
}


export default Datagrid