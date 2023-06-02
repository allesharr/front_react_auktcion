import React from 'react';
import { PreviousPageButton } from '../Common/Buttons'
import CreateEditUserInformationForm from './CreateEditUserInformationForm'
import { useParams, useNavigate } from 'react-router-dom'
import PageTitle from '../Common/PageTitle'
import CustomToolbar from '../Common/CustomToolbar'
import { applicationDataAPI } from '../../api/api';
import { useTypedSelector } from '../../hooks/useTypedSelector'

interface IFormProps {
    mode: string
}

const CreateEditUserInformation: React.FC<IFormProps> = ({ mode }) => {
    
    const { id } = useParams()

    const resource = "users"

    const { resource_api_name } = useTypedSelector(state => state.applicationData[resource])

    const [user, setUser] = React.useState<any>(null)

    const navigate = useNavigate()

    React.useEffect(() => {
        if (mode === "edit" && id) applicationDataAPI.getOne(resource_api_name,id).then(({data}) => {
            setUser(data)
        }).catch(error => {
            navigate(-1)
        })
    },[])

    return (
            <>
            <CustomToolbar>            
                <PageTitle 
                    text={
                            mode === "create"
                             ? 
                             "Создание нового пользователя" 
                             : 
                             (user?.login ? `Редактирование данных пользователя ${user.login}` : `Редактирование данных пользователя`)}
                             />
                <PreviousPageButton/>
            </CustomToolbar>
            
            {
                mode === "create" && <CreateEditUserInformationForm id={id} mode={mode} resource={resource}/>
            }
            
            {
                mode === "edit" && <CreateEditUserInformationForm id={id} mode={mode} resource={resource} user={user}/>
            }
        </>
    )
}

export default CreateEditUserInformation
