import React from 'react'
import { Typography, Button } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {

  const navigate = useNavigate()

  return (
    <div style={{padding: 12}}>
        <Typography variant="h5" style={{marginBottom: 8}}>
            Ошибка
        </Typography>
        <Button onClick={() => navigate('networks')} variant="contained" color="primary">
            Вернуться на страницу авторизации
        </Button>

    </div>
  )
}

export default ErrorPage