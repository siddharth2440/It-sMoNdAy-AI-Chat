import { Container } from '@mui/material'
import React from 'react'
import Navbar from '../Components/Navbar.jsx'
import orbitalLogo from "../assets/orbital.png"

const RootLayout = ({children}) => {
  return (
    <Container className='min-h-screen lg:min-w-[100vw] flex items-start flex-col justify-start bg-[#0E0D17] overflow-hidden relative'>
        <img src={orbitalLogo} alt=""  className='absolute orbital top-0 left-0 opacity-10'/>
        <Navbar/>
        {children}
    </Container>
  )
}

export default RootLayout