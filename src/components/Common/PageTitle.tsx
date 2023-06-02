import React from 'react'
import { Typography } from '@material-ui/core';

const PageTitle = ({text}) => {
  return (
    text 
    ?
    <Typography style={{fontWeight: "500", fontSize: "1.125rem"}}>{text}</Typography>
    :
    <div></div>
  )
}

export default PageTitle