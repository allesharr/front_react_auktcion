import {useState } from 'react'
import { DatePicker } from 'react-datepicker'


const Date_Picker = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
      <DatePicker dateFormat="yyyy-mm-dd" selected={startDate} onChange={(date) => setStartDate(date)} />
    );
  };

export default Date_Picker