import React from 'react';
import { Box } from '@material-ui/core';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
    style?: any;
    paddingTop?: number
  }
  
export const TabPanel: React.FC<TabPanelProps> = (props) => {
    const { children, value, index, paddingTop, ...other } = props
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`wrapped-tabpanel-${index}`}
        aria-labelledby={`wrapped-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box 
            pt={paddingTop}
            >
            <div>
              {children}
              </div>
          </Box>
        )}
      </div>
    );
  }
  
 export const a11yProps = (index: any) => {
    return {
      id: `wrapped-tab-${index}`,
      'aria-controls': `wrapped-tabpanel-${index}`,
    };
  }

  