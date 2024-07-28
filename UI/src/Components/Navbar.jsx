import { Box, CircularProgress, Typography } from '@mui/material'
import React, { lazy, Suspense } from 'react'
import logo from "../assets/logo.png"
import { SignedIn, UserButton } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <Box className="flex items-center lg:min-h-[9vh] mt-4 lg:pl-5 justify-start gap-2">

        <Link to={"/"}>
        <Suspense fallback={<CircularProgress/>}>
            <img src={logo} alt="" className='h-[1.5rem] lg:h-[2rem] w-auto'/>
        </Suspense>

        <Typography className='text-[0.8rem] lg:text-[1rem] font-[500] tracking-wide text-white'> It'sMoNdAy AI </Typography>
        </Link>
        
        <SignedIn>
            <UserButton />
        </SignedIn>
    </Box>
  )
}

export default Navbar