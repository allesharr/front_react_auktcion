import React from 'react'

const CustomToolbar = ({children}) => {
  return (
    <div style={{display: "flex", justifyContent: "space-between"}}>
        {children}
    </div>
  )
}

export default CustomToolbar