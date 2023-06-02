import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm, SubmitHandler, Controller, useFormState } from "react-hook-form";
import { useActions } from '../../hooks/useActions';
import { Navigate, useNavigate } from 'react-router-dom';
import { authorizationAPI } from '../../api/api';
import { sha256 } from 'js-sha256';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface ISignInForm {
  login: string;
  password: string;
}

const LoginPage = () => {

  const classes = useStyles();

  const { handleSubmit, control } = useForm<ISignInForm>();
  const { errors = {} } = useFormState({ control })
  
  const { setIsAuth, setRoles, setAuthorizationChecked } = useActions()
  const navigate = useNavigate()

  const [loginError, setLoginError] = React.useState<null | string>(null)
//________________________________________________________________________
  // const [LoginData, setLoginData] = React.useState<null | string>(null)

  // const [PasswordData, setPasswordData] = React.useState<null | string>(null)
  const [values, setValues] = React.useState({
    login: '',
    password: '',
  });

  // let LoginData = ""
  // let PasswordData =""


  const onSubmit: SubmitHandler<ISignInForm> = async data => { 
    
    // const { login, password } = data
    const login = values.login
    const password = values.password
    let hash = sha256.create();
    hash.update(password);
    const password_sha256 = hash.hex();
    
    try {

      const { data } = await authorizationAPI.login(login, password_sha256)
      
      const { session_key, user_id, roles } = data

      localStorage.setItem("session_key",session_key)
      localStorage.setItem("login",login)
      localStorage.setItem("user_id","1")
      localStorage.setItem("user_id",user_id)

      setIsAuth(true)
      setAuthorizationChecked(true)
      // setRoles(roles)
      setRoles([1])

      navigate("/",{ replace: true })

    }
    catch (err: any) {
      if (err.status === 401) setLoginError(err.message)
    }
  }
  const regAddr = process.env.REACT_APP_API_URL

  const handleRegistrationClick = (e) => {
    e.preventDefault();
    let hash = sha256.create();
    hash.update(values.password);
    const password_sha256 = hash.hex();
    axios.post (`${regAddr}/register/${values.login}-${hash}`)
    .then(resp => {
      console.log(resp)
    })
}
  const handlePasswordDataChange = password => event  => {
    setValues({...values, [password]: event.target.value})
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" style={{textAlign: "center"}}>
          Аукцион 
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>

          <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Логин"
          type="text"
          onChange = {handlePasswordDataChange('login')}
          value={values.login}
          /> 
          
          <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Пароль"
          type="password"
          onChange = {handlePasswordDataChange('password')}
          value={values.password}
          /> 

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Войти
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={handleRegistrationClick}>
              Регистрация
          </Button>
        </form>
        
        
      </div>
    </Container>
  )

 
}




const loginValidation = {
    required: "Введите логин"
};

const passwordValidation = {
  required: "Введите пароль"
};

export default LoginPage
