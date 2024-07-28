import { SignUp } from '@clerk/clerk-react'
import { Box } from '@mui/material'
import React from 'react'

const Signup = () => {
  return (
    <Box className="flex items-center justify-center bg-[#0E0D17] h-screen">
        <SignUp path="/sign-up" signInUrl='/sign-in' />
    </Box>
  )
}

export default Signup