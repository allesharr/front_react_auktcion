import React, { useCallback, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider  } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    customDivider: {
      position: "absolute", 
      margin: "auto 0",  
      top: 0, 
      bottom: 0, 
      right: 0, 
      height: "40%",
      width: 3.5,
      backgroundColor: theme.palette.type !== "dark" ? "#fcfcfe": '#303030',
      cursor: "col-resize",
    }
  }
  ));

const CustomDivider = ({position, setPosition, resourse, id, count}) => {

    const ref = useRef(null)
    const positionRef = useRef({})
    positionRef.current = position

    const  classes = useStyles()

    const mouseMove = useCallback((e) => {
        e.preventDefault()
        const clientX = e.clientX
        let left = clientX - positionRef.current[id].clientX - positionRef.current[id].diffX 
        
        if (positionRef.current[id].width + left < 40 ) {
            left = 40 - positionRef.current[id].width
        }

        setPosition(values => ({
            ...values,
            [id]: {
                ...positionRef.current[id], 
                left
            }
        })
    )},[id])

    const mouseUp = useCallback((e) => {
        e.preventDefault()

        const width = positionRef.current[id].width + positionRef.current[id].left

        setPosition(values => ({
            ...values,
            [id]: {
                ...positionRef.current[id], 
                width,
                left: 0,
                dragging: false,
                    }
                })  
            )
        if (resourse !== "") {
            let columnsWidth
            let currentColumnsWidth = localStorage.getItem('columnsWidth')
            if (!currentColumnsWidth) columnsWidth = {[resourse]: {}}
            else columnsWidth = JSON.parse(currentColumnsWidth)
            localStorage.setItem('columnsWidth', JSON.stringify({...columnsWidth, [resourse]: {...columnsWidth[resourse],[id]: width}}))
        }

},[id])
    
    if (position[id] && !position[id].dragging) {
        window.removeEventListener("mousemove", mouseMove)
        window.removeEventListener("mouseup", mouseUp)
    }

    const mouseDown = (e) => {
        e.preventDefault()
        if (count === 0) return
        
        window.addEventListener("mousemove",mouseMove)
        window.addEventListener("mouseup",mouseUp)

        setPosition(values => {
            if (ref.current) {
                return {
                ...values,
                [id]: {
                    ...positionRef.current[id],
                    diffX: 0,
                    clientX: e.clientX,
                    dragging: true
                }
                
            }}
        else return values
    })    
}


    
    return  <div 
                className={classes.customDivider}
                ref={ref}
                onMouseDown= {
                    (e) => {
                        mouseDown(e)
                    }
                }>
                    <Divider orientation="vertical"/>
            </div>

  }

export default CustomDivider