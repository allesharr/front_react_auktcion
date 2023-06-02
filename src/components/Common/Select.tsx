import React from 'react'

interface ISelectProps {
    variants: {
        [key: string]: string
    },
    selected: string
}

const Select: React.FC<ISelectProps> = ({ variants, selected }) => {

    return <span>{variants[selected]}</span> 

}

export default Select