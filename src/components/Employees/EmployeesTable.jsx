import React from 'react'
import { InputType } from "../Datagrid/Datagrid";
import Datagrid from '../Datagrid/Datagrid';
import Select from '../Common/Select'
import { getSelectVariants } from '../../helpers/helpers'
import { selectVariants_organizationTypes, organizationTypes } from '../Events/EventsTable';

const UsersTable = () => {

    const isActive = [
        { id: true, name: 'Активные'},
        { id: false, name: 'Заблокированные'}]


    const selectsVariants_isActive = getSelectVariants(isActive)

    const tableData = [
      // { id: 'id', label: 'id', inputType: InputType.Text },
      { id: 'table_number', label: 'Табельный номер', inputType: InputType.Text },
      { id: 'surname', label: 'Фамилия', inputType: InputType.Text },
      { id: 'first_name', label: 'Имя', inputType: InputType.Text },
      { id: 'middle_name', label: 'Отчество', inputType: InputType.Text },
      { id: 'org_name', label: 'Организация', inputType: InputType.Text },
      // { id: 'skud_id', label: 'Идентификатор в СКУД', inputType: InputType.Text },
      
    //   { id: 'is_active', label: 'Статус', inputType: InputType.Select, 
    //   dataHandler: value => <Select selected = {value} variants = { selectsVariants_isActive }/>, 
    //   variants: isActive
    // },
  ];

      const resource = "employees"
      
      return <Datagrid 
                tableData={ tableData } 
                resource = { resource }/>
}

export default UsersTable