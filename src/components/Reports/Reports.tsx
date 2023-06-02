import React from 'react'
import {
        FormGroup,
        FormLabel,
        RadioGroup,
        FormControlLabel,
        Checkbox,
        Radio,
        FormControl, 
        InputLabel, 
        Select, 
        MenuItem, 
        Button, 
        Paper, 
        TextField, 
        Table, 
        TableRow, 
        TableCell, 
        TableBody,
        Typography } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'; 
import { useForm, SubmitHandler, Controller, useFormState } from "react-hook-form";
import { applicationDataAPI } from '../../api/api';
import { requiredField } from '../Users/CreateEditUserInformationForm';
import moment  from 'moment'
import 'moment/locale/ru.js'
import { getDate } from '../../helpers/helpers';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import { CheckBox } from '@material-ui/icons';
import { mdiConsoleNetworkOutline } from '@mdi/js';

const useStyles = makeStyles(theme => ({
    formInputs: {
        display: "flex",
        flexDirection: "column",
        width: "35%",
        "@media screen and (max-width: 1000px)": {
            width: "80%"
        },
        "@media screen and (max-width: 700px)": {
            width: "100%"
        }
     },
     tableHeader: {
        fontWeight: "bold"
      },
      tableRow: {
        '&:nth-of-type(even)': {
          backgroundColor: theme.palette.action.hover,
        }
      }
    })
)

interface InOut {
    reporting_date: Date,
    report_type: string
}

const InOutForPerson = ({setReportParameters, report}) => {

    const { handleSubmit, watch, control, reset } = useForm<InOut>({
        defaultValues: {
            report_type: "all"
        },
        mode: "onSubmit",
        reValidateMode: "onChange"
    });
     
    const { errors = {} } = useFormState({ 
        control
    })

    const onSubmit: SubmitHandler<InOut>  = async (data) => {

        const reportingDate = new Date(data.reporting_date).toISOString()

        const date_from = reportingDate
        const date_to = moment(reportingDate).add(1, "days").subtract(1,"seconds")

        const parameters = {

            event_time: {
                date_from, 
                date_to
            },
            report_type: data.report_type
        }

        setReportParameters(parameters)
    }

    const classes = useStyles()
    const theme = useTheme()

    const errorStyle = {
        backgroundColor: alpha(theme.palette.error.main, 0.4)
    }

    console.log(new Date().toISOString().split(".")[0])

    return (
            <>
            <form onSubmit={handleSubmit(onSubmit)} style={{position: "sticky"}}>
                <div className={classes.formInputs}>
                <Controller
                    control={control}
                    name="reporting_date"
                    rules={requiredField}
                    render={({ field }) => (
                        <TextField
                            label="Отчетная дата"
                            onChange={(e) => field.onChange(e)}
                            value={field.value ?? ""}
                            size="small"
                            margin="normal"
                            type={"date"}
                            InputLabelProps={{ shrink: true }}
                            error={ !!errors?.reporting_date}
                            helperText={ errors?.reporting_date?.message }
                            InputProps={{
                                inputProps: { max: new Date().toISOString().split("T")[0] },
                                  }
                                }
                        />
                    )}
                />
                 {/* <FormGroup dir='column' style={{margin: '8px 0'}}>

                
                    <FormControlLabel
                            label="Сотрудники ГБУ"
                            
                            control= { <Controller
                            name="type_employees"
                            rules={requiredField}
                            control={control}
                            render={({ field }) => (
                                <Checkbox                               
                                    onChange={(e) => field.onChange(e)}
                                    value={field.value ?? ""}
                                />
                            )}
                        /> }
                    />
                    <FormControlLabel
                            label="Гости ГБУ"
                            
                            control= { <Controller
                            name="type_guests"
                            rules={requiredField}
                            control={control}
                            render={({ field }) => (
                                <Checkbox                               
                                    onChange={(e) => field.onChange(e)}
                                    value={field.value ?? ""}
                                />
                            )}
                        /> }
                    />
                    <FormControlLabel
                            label="Сотрудники сторонних организаций"
                            
                            control= { <Controller
                            name="type_all"
                            rules={requiredField}
                            control={control}
                            render={({ field }) => (
                                <Checkbox                               
                                    onChange={(e) => field.onChange(e)}
                                    value={field.value ?? ""}
                                />
                            )}
                        /> }
                    />
                    <FormControlLabel
                        label="Все"
                        control= { <Controller
                        name="type_all"
                        rules={requiredField}
                        control={control}
                        render={({ field }) => (
                            <Checkbox                               
                                onChange={(e) => field.onChange(e)}
                                value={field.value ?? ""}
                            />
                        )}
                    /> }
                />
                 
                    </FormGroup> */}
                <FormControl component="fieldset" style={{margin: "16px 0 8px 0", width: 350}}>

                    <FormLabel component="legend">Тип отчёта:</FormLabel>
                    
                    <Controller
                        name="report_type"
                        rules={requiredField}
                        control={control}
                        render={({ field }) => (
                            <RadioGroup
                    
                                value={field.value ?? "" }
                                onChange={(e) => field.onChange(e)}
                                >
                                <FormControlLabel value="employees" control={<Radio />} label="Сотрудники ГБУ" />
                                {/* <FormControlLabel value="guests" control={<Radio />} label="Гости ГБУ" /> */}
                                <FormControlLabel value="third_party_employees" control={<Radio />} label="Сотрудники сторонних организаций" />
                                <FormControlLabel value="all" control={<Radio />} label="Все" />
                            </RadioGroup>

                        )}
                    /> 


                </FormControl>
                <div>                    
                    <Button 
                        type="submit"
                        variant="contained"
                        color="primary"
                        style={{marginTop: 12}}>Получить отчет</Button>
                </div>
                </div>
            </form>
            {
                report
                
                &&

                (
                    report.length > 0

                    ?

                    <Paper elevation={1} style={{ marginTop: 16, marginBottom: 16 }}>

                    <Table>
                        <TableBody>
                        
                        <TableRow className={classes.tableRow}>
                            <TableCell component={"th"}></TableCell>
                            <TableCell component={"th"} className={classes.tableHeader}>Первый проход</TableCell>
                            <TableCell component={"th"} className={classes.tableHeader}>Последний проход</TableCell>
                        </TableRow>

                                    {

                                        report.map((value, i) => {

                                            let employeeFullname = ""

                                            if (value[0] && value[0].user) {
                                                const employee = value[0].user
                                                employeeFullname = `${employee.surname} ${employee.first_name} ${employee.middle_name}`
                                            }

                                            const date_1 = report[i][0]?.event_time
                                            const date_2 = report[i][1]?.event_time

                                            const event_name_1 = report[i][0]?.event_name
                                            const event_name_2 = report[i][1]?.event_name


                                            const incorrectData = value.length < 2 || event_name_1 !== "Турникет входной:Вход" || event_name_2 !== "Турникет входной:Выход"
                                            

                                            return (<TableRow className={classes.tableRow} style={incorrectData ? errorStyle : {}}>
                                                        <TableCell>{employeeFullname}</TableCell>
                                                        <TableCell>
                                                            <span>{getDate(date_1)}</span>
                                                            <br/>
                                                            <span>{event_name_1}</span>                                                            
                                                        </TableCell>
                                                        <TableCell>
                                                            <span>{getDate(date_2)}</span>
                                                            <br/>
                                                            <span>{event_name_2}</span> 
                                                        </TableCell>
                                                </TableRow>)
                                    })
                                }
                        </TableBody>
                    </Table>


                </Paper >

                :

                <Typography style={{marginTop: 32}}>Данные отсутствуют</Typography>
                )

            }
            </>
    )
}

const Reports = () => {

    const classes = useStyles()

    const [reportTitle, setReportTitle] = React.useState<any>("in_out_for_person")
    const [reportParameters, setReportParameters] = React.useState<{ [key: string]: any } | null >(null)
    const [report, setReport] = React.useState<any>(null)

    const reports = [
        { id: "in_out_for_person", name: "Проходы через турникет за день (первый и последний)" }
    ]

    React.useEffect(() => {

        if (reportParameters) applicationDataAPI.fetchData(`reports/${reportTitle}`, {
            orderBy: "event_1_date",
            order: "asc",
            filterValues: {
                ...reportParameters
            }
        })
        .then(({data}) => {
            setReport(data)
        })

    }, [reportParameters, reportTitle])

    return (
            <>
            <div className={classes.formInputs}>
                    <FormControl 
                        margin='normal' 
                        size="small"
                        >
                        <InputLabel>Выберите отчёт</InputLabel>

                        <Select
                            onChange={(e: React.ChangeEvent<{ value: unknown }>) => {
                                setReportParameters(null)
                                setReportTitle(e.target.value)
                            }}
                            value={reportTitle}>
                            { 
                                reports.map(type => <MenuItem key={type.id} value={type.id}>{type.name}</MenuItem>)
                            }                              
                        </Select>
                        {/* <FormHelperText error>Не выбран отчёт</FormHelperText>  */}
                </FormControl>
            </div>
                
                {
                    reportTitle === "in_out_for_person"
                    
                    &&

                    <InOutForPerson setReportParameters={setReportParameters} report={report}/>

                }


            </>
    )   
}

export default Reports