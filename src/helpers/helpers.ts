import { Variant } from "../types/components"

export const getInputDate = (value) => {
  const date = new Date(value)
  if (date instanceof Date && !isNaN(Number(date)) && value !== null )
  return new Date(date.setHours(date.getHours() + 3)).toISOString().split('T')[0]
  else return ""
}

export const getDate = (value, format?) => { 
    const date = new Date(value)
    if (date instanceof Date && !isNaN(Number(date)) && value !== null ) {
      const addValues = (number) => {
        if (number.toString().length === 1) return `0${number}`
        return number
    }
    if (!format || format === "datetime") return `${addValues(date.getDate())}.${addValues(date.getMonth() + 1)}.${date.getFullYear()}, ${addValues(date.getHours())}:${addValues(date.getMinutes())}:${addValues(date.getSeconds())}`
    else if (format === "date") return `${addValues(date.getDate())}.${addValues(date.getMonth() + 1)}.${date.getFullYear()}`
    } 
    return null
  }
  
  export const getDateRangeValue = (date_from: Date, date_to: Date, format?): string | null => {

            

            let dateFrom, dateTo
            if (date_from && !date_to) {
                dateFrom = getDate(date_from, format)
                if (!dateFrom) return ''
                else return `c ${dateFrom}`
            }
  
            else if (!date_from && date_to) {
                dateTo = getDate(date_to, format)
                if (!dateTo) return ''
                else return `по ${dateTo}`
            }
  
            else if (date_from && date_to) {
                dateFrom = getDate(date_from, format)
                dateTo = getDate(date_to, format)
                if (!dateTo || ! dateFrom) return 'с по'
                else return `c ${dateFrom} по ${dateTo}`
            }
            return null
  }

  export const removeByKey = <T>(obj: T, deleteKey: string | number): T => {
      return Object.keys(obj)
        .filter(key => key !== deleteKey)
        .reduce( (resultObject, currentValue) => {
          resultObject[currentValue] = obj[currentValue];
          return resultObject;
      }, {} as T);
  }

  export const removeByKeys = <T>(obj: T, deleteKeys: string[]): T => {
    return Object.keys(obj)
      .filter((key: string) => { 
       return !deleteKeys.includes(key)
      })
      .reduce( (resultObject, currentValue) => {
        resultObject[currentValue] = obj[currentValue];
        return resultObject;
    }, {} as T);
}


  export const getSelectVariants = (variants: Variant[]) => {
    return variants.reduce((acc, curr: Variant) => {
      acc[curr.id] = curr.name
      return acc
    },{})
  }
  
  export const checkBrowser = () => {
    const sUsrAg = navigator.userAgent;
  if (sUsrAg.indexOf("Firefox") > -1) {
       return true
      }
  else {
    return false
  } 
}

export const isJsonValid = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}