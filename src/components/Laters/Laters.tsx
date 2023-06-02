import React from 'react'
import { InputType } from "../Datagrid/Datagrid";
import { checkBrowser, getDate, getDateRangeValue } from '../../helpers/helpers'
import Datagrid from '../Datagrid/Datagrid';
import { getSelectVariants } from '../../helpers/helpers';
import Select from '../Common/Select';
import LatesDatagrid from '../Datagrid/DatagridLates'
import Date_Picker from '../Datepicker/Datepicker';

export const supportTypes = [  
  { id: 28, name: "Пропуск" },
  { id: 32, name: "Поворот" }
]

const selectVariants_supportTypes = getSelectVariants(supportTypes)


export const tableData = [

  // { id: 'id', label: 'id', inputType: InputType.Text },
  { id: 'Name', label: 'Имя работника', inputType: InputType.Text },

  { id: "isMorningLate", label: 'Опоздал ли с утра?', inputType: InputType.Text },

  { id: 'isEveningEarly', label: 'Ушел ли раньше с работы?', inputType: InputType.None},
  
  { id: 'isEveningEarly', label: 'Опоздал ли с обеда?', inputType: InputType.None},

  { id: 'isEveningEarly', label: 'Слишком много курит?', inputType: InputType.None},

  { id: 'event_time', label: 'Дата события', inputType: InputType.Date,
                  inputValueHandler: (date_from, date_to) => {
                    let format = "datetime"
                    if (checkBrowser()) format = "date"
                    return getDateRangeValue(date_from, date_to, format)
                        }, 
                  dataHandler: (value) => {

                    return getDate(value)}},
];

const Laters = () => {

      let resource:string = "lates"
      
      console.log(getCurrentDate())
      let date:string = getCurrentDate()

      // return <LatesDatagrid _tableData={tableData} _resource_to_ask={resource} _date={date} />
      return (
        <div>
          {/* <Date_Picker/> */}
          <LatesDatagrid _tableData={tableData} _resource_to_ask={resource} _date={date} />
      </div>
      )
}


const getCurrentDate = (separator='') => {

  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  m = month.toString()
  if (month < 10 ){
    var m = "0" + month.toString()
  }
  return `${year}-${m}-${date}`
  }
export default Laters