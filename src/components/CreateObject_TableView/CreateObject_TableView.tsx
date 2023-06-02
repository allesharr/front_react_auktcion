import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { SubmitHandler } from 'react-hook-form';



const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        //   flexDirection: 'column',
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

const CreateObject_TableView = () => {
    
    const [values, setValues] = React.useState({
        Number: '',
        Seller: '',
        Object: '',
        WhoGaveMax: '',
        Money: '',
        TimeToOut: '',
    });

    const classes = useStyles();
    const handlePasswordDataChange = password => event  => {
        setValues({...values, [password]: event.target.value})
      }

    

    const submitFunction = async () => { 

    }
    return (
        // <div>
        //     Aukt
        // </div>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5" style={{ textAlign: "center" }}>
                    Аукцион
                </Typography>
                <form className={classes.form} noValidate onSubmit={submitFunction}>

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Логин"
                        type="text"
                        onChange={handlePasswordDataChange('Number')}
                        value={values.Number}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Пароль"
                        type="password"
                        onChange={handlePasswordDataChange('Seller')}
                        value={values.Seller}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Пароль"
                        type="password"
                        onChange={handlePasswordDataChange('Object')}
                        value={values.Object}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Пароль"
                        type="password"
                        onChange={handlePasswordDataChange('WhoGaveMax')}
                        value={values.WhoGaveMax}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Пароль"
                        type="password"
                        onChange={handlePasswordDataChange('Money')}
                        value={values.Money}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}>
                        Войти
                    </Button>
                </form>
            </div>
        </Container>
        )
}

export default CreateObject_TableView