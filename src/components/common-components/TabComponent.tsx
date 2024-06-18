import { useTab } from '@/context/TabContext'
import theme from '@/theme/defaultTheme'
import { PageControls, TabPropsType } from '@/types/common'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box, Tab } from '@mui/material'

type Props = {
  tabProps: TabPropsType
}
const TabComponent = ({ tabProps }: Props) => {
  const { tabIndex, setTabIndex } = useTab()
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={tabIndex}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList
            onChange={(event: React.SyntheticEvent<Element, Event>, value: string) => {
              setTabIndex(value)
              tabProps?.handleTabChange(value)
            }}
            TabIndicatorProps={{ sx: { background: theme.palette.mPink.main } }}
            sx={{
              '.MuiTab-root': {
                '&.Mui-selected': {
                  color: theme.palette.mPink?.main,
                  fontWeight: 500,
                },
              },
            }}
          >
            {tabProps.tabList.map((tab) => {
              return <Tab label={tab.tabName} value={tab?.tabValue} key={Math.random()} />
            })}
          </TabList>
        </Box>
        {tabProps.tabList.map((tab) => {
          return (
            <TabPanel value={tab?.tabValue} key={Math.random()}>
              {tab?.tabElement}
            </TabPanel>
          )
        })}
      </TabContext>
    </Box>
  )
}

export default TabComponent
