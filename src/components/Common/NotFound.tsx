import React from 'react'
import { Typography, Button } from '@material-ui/core'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {

  const navigate = useNavigate()

  return (
    <div style={{padding: 12}}>
        <Typography variant="h5" style={{marginBottom: 8}}>
            Страница не найдена
        </Typography>
        <Button onClick={() => navigate('/')} variant="contained" color="primary" size="small">
          Вернуться на главную
        </Button>

    </div>
  )
}

export default NotFound