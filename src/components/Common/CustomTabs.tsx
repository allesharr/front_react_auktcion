import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Divider from '@material-ui/core/Divider'
import Paper from '@material-ui/core/Paper'
import { a11yProps } from '../Common/TabPanel'
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';

interface ICustomTabs {
  resource: string,
  labels?: string[]
}

const CustomTabs: React.FC<ICustomTabs> = ({resource, labels = ["",""]}) => {

    const tab = useTypedSelector(state => state.application.tabs[resource])

    const { setTab }  = useActions()
  
    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
      setTab(resource, newValue);
    };
  
    const { sideBarOpen } = useTypedSelector(state => state.application)

    return (
        <Paper style={{borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}>
        <Tabs 
          value={tab} 
          onChange={handleChange} 
          variant="fullWidth"
          style={{width: sideBarOpen ? "84vw" : "94vw" }}
          >
          <Tab
            value={0}
            label={labels[0]}
            
            // wrapped
            {...a11yProps("1")}
          />
          <Tab value={1} label={labels[1]} {...a11yProps("1")} />
        </Tabs>
        <Divider/>
      </Paper>
      );
}

export default CustomTabs