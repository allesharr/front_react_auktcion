import React from 'react'
import { Typography } from '@material-ui/core'

interface InformationFieldProps {
    label: string,
    content: React.ReactNode | string | null | undefined
}

const InformationField:React.FC<InformationFieldProps> = ({label, content}) => {
  return (
    <Typography style={{margin: "16px 0"}}><span style={{fontWeight: "bold"}}>{`${label}: `}</span>{content}</Typography>
  )
}

export default InformationField