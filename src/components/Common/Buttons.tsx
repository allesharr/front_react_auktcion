import React from "react"
import { Button, IconButton } from "@material-ui/core"
import { useNavigate } from 'react-router-dom'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import EditIcon from '@material-ui/icons/Edit';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import { applicationDataAPI } from "../../api/api";
import { useActions } from '../../hooks/useActions'
import { useTypedSelector } from '../../hooks/useTypedSelector'
import CustomDialog from './CustomDialog'

interface IRecordPageButtonProps {
    row?: {[key: string]: any},
}

export const RecordPageButton: React.FC<IRecordPageButtonProps> = ({ row }) => {

    const navigate = useNavigate()

    const toEditPage = (event: React.SyntheticEvent) => {
        event.preventDefault()
        row && row.id && navigate(`${row.id}`)
    }

    return <IconButton
            onClick={toEditPage} 
            color="primary"
            size="small"
            > 
            <OpenInNewIcon fontSize={"medium"}/>
    </IconButton>
}

interface IOpenDialogButtonProps {
    row?: {[key: string]: any},
    content: React.ReactElement,
    title?: string 
}

export const OpenDialogButton: React.FC<IOpenDialogButtonProps> = ({ row, content, title }) => {

    const [open, setOpen] = React.useState(false)

    return (
        <>
        <IconButton
            onClick={() => setOpen(true)} 
            color="primary"
            size="small"> 
            <OpenInNewIcon fontSize={"medium"}/>
        </IconButton>
        {
            open
            &&
            <CustomDialog open={open} content={ React.cloneElement(content,{ row }) } setOpen={setOpen} title={title}/>
        }
        </>
    ) 

}

interface IEditButtonProps {
    row?: {[key: string]: any},
    resource?: string
}

export const EditButton: React.FC<IEditButtonProps> = ({ row }) => {

    const navigate = useNavigate()

    const toEditPage = (event: React.SyntheticEvent) => {
        event.preventDefault()
        row && row.id && navigate(`${row.id}/edit`)
    }

    return <IconButton 
                onClick={toEditPage} 
                color="primary" 
                size="small"
                >
        <EditIcon fontSize={"medium"} />
    </IconButton>
}

export const SaveButton = ({mode}) => {
    return (
        <Button
        type="submit"
        variant="contained"
        color="primary"
        size="small"
        disableElevation={ true }
        style={{marginTop: 12}}>
        { mode === "create" ? "Создать" : "Сохранить" }
    </Button>
    )
}

interface IDeleteButton {
    id: string | undefined,
    mode: string,
    resource: string,
    basePath: string | undefined,
    resource_api_name: string
}

export const DeleteButton: React.FC<IDeleteButton> = ({id, mode, resource, basePath, resource_api_name}) => {

    const navigate = useNavigate()
    const { parameters, data } = useTypedSelector(state => state.applicationData[resource])

    const { updateTableParameters } = useActions()


    const deleteRecord = async () => {
        if (mode === "edit" && id) {
            try {
                await applicationDataAPI.deleteRecord(resource_api_name, id)
                if (data.length === 1 && parameters.page > 1) updateTableParameters(resource,{page: parameters.page - 1}) 
                if (basePath) navigate(basePath)
            }
            catch(err) {

            }
        }
    }

    if (mode !== "edit" || !id) return null

    return (<Button
        variant="contained"
        color="primary"
        size="small"
        disableElevation={ true }
        style={{marginTop: 12, marginLeft: 16}}
        onClick={deleteRecord}>
        Удалить
    </Button> 
    )
}

export const PreviousPageButton = () => {

    const navigate = useNavigate()

    const toPreviousPage = (event: React.SyntheticEvent) => {
        event.preventDefault()
        navigate(-1)
    }

    return <Button onClick={toPreviousPage} startIcon={<ChevronLeftIcon/>} color="primary" size="small">
        Вернуться назад
    </Button>
}

export default PreviousPageButton

