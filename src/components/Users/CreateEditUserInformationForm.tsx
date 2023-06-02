import React from 'react';
import { useForm, SubmitHandler, Controller, useFormState } from "react-hook-form";
import { applicationDataAPI } from '../../api/api';
import { useNavigate } from 'react-router-dom'
import { SaveButton } from '../Common/Buttons'
import { InputLabel, FormControl, TextField, FormHelperText, MenuItem, Select, Switch, FormControlLabel, Checkbox } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTypedSelector } from '../../hooks/useTypedSelector'
import { sha256 } from 'js-sha256';
import { removeByKeys } from '../../helpers/helpers';

const useStyles = makeStyles({
    formInputs: {
        display: "flex",
        flexDirection: "column",
        width: "50%",
        "@media screen and (max-width: 1000px)": {
            width: "80%"
        },
        "@media screen and (max-width: 700px)": {
            width: "100%"
        }
     }
    }
)

interface IUser {
    surname: string,
    name: string,
    patronymic: string,
    position: string,
    login: string,
    password: string,
    password_hash: string,
    confirmPassword: string,
    role_id: string | number,
    is_active: boolean
}

interface IFormProps {
    id: string | undefined,
    mode: string,
    resource: string,
    user?: any
}

const CreateEditUserInformationForm: React.FC<IFormProps> = ({ id, mode, resource, user }) => {

    const navigate = useNavigate()

    const { handleSubmit, watch, control, reset } = useForm<IUser>({
        defaultValues: {
            password: "",
            confirmPassword: "",
            is_active: true
        },
        mode: "onSubmit",
        reValidateMode: "onChange"
    });
    
    const { errors } = useFormState({ 
        control
    })

    const password = watch("password","")

    const { basePath, resource_api_name } = useTypedSelector(state => state.applicationData[resource])

    const onSubmit: SubmitHandler<IUser> = async (data) => {
        

        let passwordHash = sha256.create();
        passwordHash.update(data.password);

        const formData = removeByKeys(data, ["password", "confirmPassword", "session_key", "session_key_ts"])

        formData.password_hash = passwordHash.hex();
        formData.role_id = Number(data.role_id)
        
        try {
            if (mode === "create") await applicationDataAPI.createRecord(resource_api_name, formData)
            if (mode === "edit" && id) await applicationDataAPI.updateRecord(resource_api_name, id, formData)
            if (basePath) navigate(basePath)
        }
            catch(err) {

            }
    }

    const [checked, setChecked] = React.useState(false)

    React.useEffect(() => {
        if (mode === "edit") {
            if (user) reset({...user, password: ""})
        } 
    },[mode, user])

    const classes = useStyles()

    return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.formInputs}>
                <Controller
                    control={control}
                    name="login"
                    rules={requiredField}
                    render={({ field }) => (
                        <TextField
                            label="Логин"
                            onChange={(e) => field.onChange(e)}
                            value={field.value ?? ""}
                            size="small"
                            margin="normal"
                            inputProps={{autocomplete: "new-password"}}
                            InputLabelProps={{ shrink: (mode === 'edit' && field.value) ? true : undefined }}
                            error={!!errors.login}
                            helperText={ errors?.login?.message }
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="password"
                    rules={ mode === "create" ? {
                        required: REQUIRED_FIELD,
                        validate: (value) => {
                            if (!passwordRegExp.test(value)) return 'Некорректный пароль'
                            return true
                    }} : {
                        validate: (value) => {
                            if (!passwordRegExp.test(value) && value.length > 0) return 'Некорректный пароль'
                            return true
                    }
                    }}
                    render={({ field }) => (
                        <TextField
                            label="Пароль"
                            onChange={(e) => field.onChange(e)}
                            value={field.value ?? ""}
                            size="small"
                            margin="normal"
                            type={checked ? "text" : "password" }
                            inputProps={{autocomplete: "new-password"}}
                            InputLabelProps={{ shrink: (mode === 'edit' && field.value) ? true : undefined }}
                            error={!!errors.password}
                            helperText={ errors?.password ? errors?.password?.message : "От 8 до 14 символов, строчные и прописные буквы латинского алфавита, цифры" }
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="confirmPassword"
                    rules={ mode === "create" ? {
                        required: REQUIRED_FIELD,
                        validate: (value) => {
                            if (value !== password) return "Пароли не совпадают"
                            return true
                    }} : {
                        validate: (value) => {
                            if (value !== password) return "Пароли не совпадают"
                            return true
                    }
                    }}
                    render={({ field }) => (
                        <TextField
                            label="Подтвердите пароль"
                            onChange={(e) => field.onChange(e)}
                            value={field.value ?? ""}
                            size="small"
                            margin="normal"
                            type={checked ? "text" : "password" }
                            inputProps={{autocomplete: "new-password"}}
                            InputLabelProps={{ shrink: (mode === 'edit' && field.value) ? true : undefined }}
                            error={!!errors.confirmPassword}
                            helperText={ errors?.confirmPassword?.message }
                        />
                    )}
                />

                <FormControlLabel
                    style={{marginTop: 8, marginBottom: 8}}
                    control={<Checkbox checked={checked} onChange={() => setChecked(value => !value)} />}
                    label="Показать пароль?"/>


                </div>
                <div>
                    <SaveButton mode={mode}/>
                </div>
            </form>
    )
}

const REQUIRED_FIELD = 'Обязательно для заполнения';
// const passwordRegExp = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])[0-9a-zA-Z!@#$%^&*]{4,14}$/)
const passwordRegExp = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,14}$/)
export const requiredField = {
    required: REQUIRED_FIELD,
};

export default CreateEditUserInformationForm