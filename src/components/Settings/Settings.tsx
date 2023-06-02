import React from 'react';
import { Button, Typography } from '@material-ui/core';

const Configuration = () =>{

    const setDefaultTableSettings = () => {
        localStorage.removeItem('columnsWidth');
    }

    const setDefaultTableColumnsSettings = () => {
        localStorage.removeItem('hiddenColumns_skud');
    }

    return (
             <>
                <Typography>Сбросить настройки табличек: </Typography>
                    
                    <div style={{marginTop: 8}}>
                        <Button 
                            color="primary"
                            variant="contained" 
                            size="small"
                            style={{marginRight: 16}} 
                            onClick={setDefaultTableColumnsSettings}>Столбцы</Button>
                        <Button 
                            color="primary" 
                            variant="contained" 
                            size="small"
                            onClick={setDefaultTableSettings}>Ширина столбцов</Button>
                    </div>
            </>
    );
}

export default Configuration;