import React, { ReactNode, useState } from 'react'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
type Props = {}
const ListArray: Record<
  string,
  { icon: ReactNode; name: string; subgroup: { icon: ReactNode; name: string }[] }[]
> = {
  Organization: [
    {
      icon: <DashboardIcon />,
      name: 'Dashboard',
      subgroup: [{ icon: <DashboardIcon />, name: 'Dashboard Child' }],
    },
    { icon: <DashboardIcon />, name: 'User', subgroup: [] },
  ],
}
const Sidebar = (props: Props) => {
  const [expandMenu, setExpandMenu] = useState<{ grpName: string; index: number } | undefined>(
    undefined,
  )
  return (
    <SwipeableDrawer open={true} onClose={() => {}} onOpen={() => {}}>
      {Object.keys(ListArray).map((group) => {
        return (
          <List
            key={Math.random()}
            sx={{ width: '100%', minWidth: 360, bgcolor: 'background.paper' }}
            subheader={
              <ListSubheader component='div' id='nested-list-subheader'>
                {group}
              </ListSubheader>
            }
          >
            {ListArray[group].map((groupItems, groupIndex) => {
              const expandCondition =
                expandMenu?.grpName.toLocaleLowerCase().trim() ===
                  group?.toLocaleLowerCase().trim() && expandMenu?.index === groupIndex
              return (
                <List key={Math.random()}>
                  <ListItemButton
                    onClick={() => {
                      if (groupItems?.subgroup?.length > 0) {
                        if (
                          expandMenu?.grpName.toLocaleLowerCase().trim() ===
                            group?.toLocaleLowerCase().trim() &&
                          expandMenu?.index === groupIndex
                        ) {
                          setExpandMenu(undefined)
                        } else {
                          setExpandMenu({ grpName: group, index: groupIndex })
                        }
                      }
                    }}
                  >
                    <ListItemIcon>{groupItems?.icon}</ListItemIcon>
                    <ListItemText primary={groupItems?.name} />
                    {/* {true ? <ExpandLess /> : <ExpandMore />} */}
                    {groupItems?.subgroup?.length > 0 ? (
                      expandCondition ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )
                    ) : null}
                  </ListItemButton>
                  {groupItems?.subgroup?.length > 0 && (
                    <Collapse in={expandCondition}>
                      <List>
                        {groupItems?.subgroup?.map((subGroupItem) => {
                          return (
                            <ListItemButton key={Math.random()} sx={{ pl: 4 }}>
                              <ListItemIcon>{subGroupItem?.icon}</ListItemIcon>
                              <ListItemText primary={subGroupItem?.name} />
                            </ListItemButton>
                          )
                        })}
                      </List>
                    </Collapse>
                  )}
                </List>
              )
            })}
          </List>
        )
      })}
    </SwipeableDrawer>
  )
}

export default Sidebar
