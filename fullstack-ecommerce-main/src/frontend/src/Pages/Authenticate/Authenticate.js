import React from 'react'
import SignIn from './Auth/SignIn'
import SignUp from './Auth/SignUp'
import TabsMenu from '../../Component/Tabs/TabsMenu'
import Box from '@mui/material/Box';

function Authenticate(props) {
    const [selectedTab, setSelectedTab] = React.useState(0);

    const getTabsContent = () => {
        return <CustomTabPanel value={selectedTab} index={selectedTab}>
      {   selectedTab == 0 ? <SignIn/> : <SignUp setSelectedTab={setSelectedTab}/>}
        </CustomTabPanel>
    }

  return (
    <div id="authenticate">

        <TabsMenu menu={[{title : "Login" , id:0},{title : "Register" , id: 1}]}
        handleTabChange={(event, newValue) => {
            setSelectedTab(newValue)
        }}
        selectedTab={selectedTab} setSelectedTab={setSelectedTab}
        tabContent={getTabsContent}/>
   
    </div>
  )
}

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

export default Authenticate