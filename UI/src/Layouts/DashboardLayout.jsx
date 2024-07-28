import React, { useState } from 'react'
import {Menu} from "@mui/icons-material"
import { Box, Button, Container, Drawer, List,  MenuList, Typography } from "@mui/material"
import Navbar from "../Components/Navbar.jsx"
import Sidebar from '../Components/Sidebar.jsx'
const DashboardLayout = ({children}) => {
  const [open,setOpen] = useState(true)
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen)
  }
  return (
    <Container className='min-h-screen lg:min-w-[100vw] flex items-start flex-col justify-start bg-[#0E0D17] overflow-hidden relative'>
        <Navbar/>
        <Box className="text-white flex items-start justify-start w-[100%] px-2">
          
          <Box className="flex items-center justify-start gap-2">
            <Menu onClick={toggleDrawer(true)} className='border-2 rounded-md cursor-pointer transition-all delay-75 duration-100 ease-out hover:bg-[#242424] border-[#272727] px-3 h-[1.2rem] lg:h-[1.6rem] w-auto my-3'/>
            <Typography className=' text-[0.9rem] lg:text-[1.1rem] textGradient'> It'sMoNdAy </Typography>
          </Box>
          
          <Drawer open={open} onClose={toggleDrawer(false)}>
            <Sidebar/>
          </Drawer>
        </Box>
        {children}
    </Container>
  )
}

export default DashboardLayout