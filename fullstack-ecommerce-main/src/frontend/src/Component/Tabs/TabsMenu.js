import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';



  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
function TabsMenu(props) {
    return (
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={props.selectedTab} onChange={props.handleTabChange} aria-label="basic tabs example" centered>
                {props.menu.map((menuItem) =>    <Tab label={menuItem.title}  id={menuItem.id} {...a11yProps(menuItem.id)}/>)}
            
            </Tabs>
          </Box>
      {props.tabContent()}
        </Box>)
}

export default TabsMenu