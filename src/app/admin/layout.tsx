'use client'

import React, { useEffect, useState } from 'react'
import { useAppContext } from '@/contexts/app'
import { usePathname, useRouter } from 'next/navigation'
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import {
  HomeOutlined,
  ShoppingCartOutlined,
  ShoppingBasketOutlined,
  CategoryOutlined,
  SupervisorAccountOutlined,
  LogoutOutlined,
} from '@mui/icons-material'
import LogoutModal from './(components)/Modals/LogoutModal'
import { Route } from 'next'
import Link from 'next/link'
import Logo from '@/shared/Logo'

interface NavigationValue {
  component: typeof HomeOutlined
  path: Route
}

const navigationItems: Record<string, NavigationValue> = {
  Home: {
    component: HomeOutlined,
    path: '/admin',
  },
  Orders: {
    component: ShoppingCartOutlined,
    path: '/admin/orders',
  },
  Tours: {
    component: ShoppingBasketOutlined,
    path: '/admin/tours',
  },
  Categories: {
    component: CategoryOutlined,
    path: '/admin/categories',
  },
  Users: {
    component: SupervisorAccountOutlined,
    path: '/admin/users',
  },
}

const Layout: React.FC = ({ children }: any) => {
  const { userInfo, loadingGetUserInfo } = useAppContext()
  const { email, isAdmin } = userInfo
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loadingGetUserInfo && email && !isAdmin) {
      router.replace('/')
    }
  }, [loadingGetUserInfo, email, isAdmin])

  const drawerWidth = 240

  const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
  })

  const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  })

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }))

  interface AppBarProps extends MuiAppBarProps {
    open?: boolean
  }

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }))

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }))

  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const openLogoutModal = () => setShowLogoutModal(true)

  const closeLogoutModal = () => {
    setShowLogoutModal(false)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Logo textClassname="!text-neutral-100" href="/admin" />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>
          {Object.keys(navigationItems).map((label) => {
            const { component: Icon, path } = navigationItems[label]
            const isActive = pathname === path

            return (
              <ListItem key={label} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 60,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  selected={isActive}
                  onClick={() => router.push(path)}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <Icon fontSize="medium" />
                  </ListItemIcon>
                  <ListItemText
                    primary={label}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            )
          })}

          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={openLogoutModal}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <LogoutOutlined fontSize="medium" />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>

      <LogoutModal visible={showLogoutModal} onClose={closeLogoutModal} />
    </Box>
  )
}

export default Layout
