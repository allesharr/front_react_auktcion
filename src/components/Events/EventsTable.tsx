import React from 'react'
import { InputType } from "../Datagrid/Datagrid";
import { checkBrowser, getDate, getDateRangeValue } from '../../helpers/helpers'
import Datagrid from '../Datagrid/Datagrid';
import { getSelectVariants } from '../../helpers/helpers';
import Select from '../Common/Select';

export const supportTypes = [  
  { id: 28, name: "Пропуск" },
  { id: 32, name: "Поворот" }
]

const selectVariants_supportTypes = getSelectVariants(supportTypes)


export const tableData = [

  // { id: 'id', label: 'id', inputType: InputType.Text },
  { id: 'skud_bid', label: 'Номер события во внешней системе', inputType: InputType.Text },

  { id: 'user', 
    label: 'Сотрудник', 
    inputType: InputType.Text, dataHandler: user => `${user.surname} ${user.first_name} ${user.middle_name}`
  },

  { id: "org_name", label: 'Организация', inputType: InputType.Text },

  { id: 'door_index', label: 'Дверь', inputType: InputType.None,  dataHandler: user => 'Основной вход'},
  
  { id: 'event_time', label: 'Дата события', inputType: InputType.Date,
                  inputValueHandler: (date_from, date_to) => {
                    let format = "datetime"
                    if (checkBrowser()) format = "date"
                    return getDateRangeValue(date_from, date_to, format)
                        }, 
                  dataHandler: (value) => {

                    return getDate(value)}},
  { id: 'event_name', label: 'Имя события', inputType: InputType.Text },

  { id: 'event_type', 
    label: 'Тип события', 
    inputType: InputType.Select, variants: supportTypes, 
    dataHandler: value => <Select selected={ value } variants={ selectVariants_supportTypes }/> 
  }

];

const EventsTable = () => {

      const resource = "events"
      
      return <Datagrid 
                tableData={ tableData } 
                resource = { resource } 
                defaultFilterValues = {{
                  door_index: 1
                }}
                />

}

export default EventsTable