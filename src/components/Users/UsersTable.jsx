import React from 'react'
import { InputType } from "../Datagrid/Datagrid";
import Datagrid from '../Datagrid/Datagrid';
import { EditButton } from '../Common/Buttons';
import Select from '../Common/Select'
import { getSelectVariants } from '../../helpers/helpers';
import { applicationDataAPI } from '../../api/api'

const UsersTable = () => {

    const [roles, setRoles] = React.useState([])

    const isActive = [
        { id: true, name: 'Активные'},
        { id: false, name: 'Заблокированные'}]

    const selectVariants_roles = getSelectVariants(roles)

    const selectsVariants_isActive = getSelectVariants(isActive)

    const tableData = [
      { id: 'id', label: 'id', inputType: InputType.Text },
      // { id: 'surname', label: 'Фамилия', inputType: InputType.Text },
      // { id: 'name', label: 'Имя', inputType: InputType.Text },
      // { id: 'patronymic', label: 'Отчество', inputType: InputType.Text },
      // { id: 'position', label: 'Должность', inputType: InputType.Text },
      { id: 'login', label: 'Логин', inputType: InputType.Text },
    //   { id: 'user_role', label: 'Роль', inputType: InputType.Select, 
    //     dataHandler: value => <Select selected={ value?.id } variants={ selectVariants_roles }/>, 
    //     variants: roles
    //   },
    //   { id: 'is_active', label: 'Статус', inputType: InputType.Select, 
    //   dataHandler: value => <Select selected = {value} variants = { selectsVariants_isActive }/>, 
    //   variants: isActive
    // },
  ];


    //   React.useEffect(() => {
    //   applicationDataAPI.fetchData("user_role").then(({data}) => {
    //     const roles = data.reduce((object,currentValue,index) => {
    //       object[index] = { ...currentValue, name: currentValue.role_alias}
    //       return object
    //     },[])
    //     setRoles(roles)
    //   }).catch(error => {

    //   })
    // },[])

      const resource = "users"
      
      return <Datagrid 
                tableData={ tableData } 
                resource = { resource }
                create={true}
                edit={true}>
                  <EditButton />
              </Datagrid> 
      
}

export default UsersTable