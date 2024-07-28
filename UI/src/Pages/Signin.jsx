import { SignIn } from '@clerk/clerk-react'
import { Box } from '@mui/material'
import React from 'react'

const Signin = () => {
  return (
    <Box className="flex items-center justify-center bg-[#0E0D17] h-screen">
        <SignIn path="/sign-in" signUpUrl='/sign-up' forceRedirectUrl='/dashboard' />
    </Box>
  )
}

export default Signin