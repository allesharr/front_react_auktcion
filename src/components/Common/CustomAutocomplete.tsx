import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core';

interface ICustomAutocompleteProps {
            onChange?,
            onInputChange?,
            error?: boolean,
            helperText: any,
            value?,
            loading?,
            inputValue?,  
            options?, 
            label?, 
            disabled?, 
            getOptionLabel?, 
            clearOnBlur?, 
            onClose?, 
            className?,

}

const CustomAutocomplete: React.FC<ICustomAutocompleteProps> = ({ 
                            onChange,
                            onInputChange,
                            inputValue,
                            error,
                            loading,
                            helperText, 
                            value,
                            options, 
                            label, 
                            disabled, 
                            getOptionLabel, 
                            clearOnBlur, 
                            onClose, 
                            className,
                            ...rest 
                        }) => {        
    return (
        <Autocomplete
            {...rest}
            onChange={ onChange }
            loading={loading}
            onInputChange={onInputChange}
            value={value ?? null}
            inputValue={inputValue ?? ""}
            disabled={disabled}
            options={options} 
            getOptionLabel={ getOptionLabel }
            getOptionSelected={(option: any, value: any) => {
                return option.id === value.id
            }}
            clearOnBlur={true}
            onClose={onClose}
            openText={"Открыть"}
            noOptionsText={"Нет результатов"}
            clearText={""}
            closeText={"Закрыть"}
            renderInput = { params => <TextField 
                                            {...params} 
                                            fullWidth 
                                            label={label} 
                                            size="small" 
                                            margin="normal" 
                                            className={className}
                                            error={error}
                                            helperText={helperText}
                                            inputProps={{
                                                ...params.inputProps,
                                                autoComplete: "disabled"
                                              }}
                                            /> }
        />
    );        
}

export default CustomAutocomplete