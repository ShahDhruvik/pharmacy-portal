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
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import { sidebarList } from '@/utils/sidebar-data'
import { useSidebar } from '@/context/SidebarContext'
import { useNavigate } from 'react-router-dom'
type Props = {}

const Sidebar = (props: Props) => {
  const { expandMenu, setExpandMenu, openMenu, setOpenMenu } = useSidebar()
  const nav = useNavigate()
  return (
    <SwipeableDrawer
      open={openMenu}
      onClose={() => {
        setOpenMenu(false)
        setExpandMenu(undefined)
      }}
      onOpen={() => {}}
    >
      {Object.keys(sidebarList).map((group) => {
        return (
          <List
            disablePadding
            key={Math.random()}
            sx={{ width: '100%', minWidth: 360, bgcolor: 'background.paper' }}
            subheader={
              <ListSubheader component='div' id='nested-list-subheader'>
                {group}
              </ListSubheader>
            }
          >
            {sidebarList[group].map((groupItems, groupIndex) => {
              const expandCondition =
                expandMenu?.grpName.toLocaleLowerCase().trim() ===
                  group?.toLocaleLowerCase().trim() && expandMenu?.index === groupIndex
              return (
                <List key={Math.random()} disablePadding>
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
                      } else {
                        nav(groupItems?.path)
                        setOpenMenu(false)
                      }
                    }}
                  >
                    <ListItemIcon>{groupItems?.icon}</ListItemIcon>
                    <ListItemText primary={groupItems?.name} />
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
                      <List disablePadding>
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
