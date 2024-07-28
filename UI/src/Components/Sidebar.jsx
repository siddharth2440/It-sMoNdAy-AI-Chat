import { Box, Container, Divider, Typography } from '@mui/material'
import React from 'react'

const Sidebar = () => {
    const dummyChats = [2,4,5,2,4,5,6,3,1,8,9,6,32,67]
  return (
    <Container className='flex  flex-col  overflow-hidden h-screen lg:w-[20vw] bg-[#0E0D17] lg:min-h-full  justify-start items-start gap-2'>

        <Typography className='text-white underline mt-3 text-[0.9rem] lg:mt-5 lg:w-[15vw] lg:text-[1.5rem] lg:font-[600]'>Dashboard</Typography>
        
        <Divider className="text-[#d7d7d7] bg-[#d7d7d7]"/>
        <Box className="flex flex-col items-start justify-start gap-2">
            <Typography className='hover:bg-[#272728] text-[0.7rem] lg:text-[1.1rem] transition-all duration-150 delay-75 ease-in-out py-1 text-white w-[100%] px-4 rounded-sm cursor-pointer'> Create a new Chat </Typography>
            <Typography className='hover:bg-[#272728] text-[0.7rem] lg:text-[1.1rem] transition-all duration-150 delay-75 ease-in-out py-1 text-white w-[100%] px-4 rounded-sm cursor-pointer'> Explore It'sMoNdAy Ai </Typography>
            <Typography className='hover:bg-[#272728] text-[0.7rem] lg:text-[1.1rem] transition-all duration-150 delay-75 ease-in-out py-1 text-white w-[100%] px-4 rounded-sm cursor-pointer'> Contact </Typography>

        </Box>
        
        <Typography className='text-white underline mt-3 lg:mt-5 lg:w-[15vw] text-[0.9rem] lg:text-[1.1rem] lg:font-[500]'>Recent Chats</Typography>
        <Box className="flex flex-col items-start justify-start gap-2 py-1 w-[100%]">
            {
                dummyChats.length > 0 ? dummyChats.map((ele)=> {
                    return (
                        <Typography key={ele+1} className='hover:bg-[#272728] transition-all duration-150 delay-75 ease-in-out py-1 text-white text-[0.6rem] w-[100%] px-4 rounded-sm cursor-pointer'>Dummy Chat</Typography>        
                    )
                }) : (
                    <Typography>Get Started with a new chat</Typography>
                )
            }
        </Box>

    </Container>
  )
}

export default Sidebar