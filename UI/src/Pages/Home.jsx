import React from 'react'
import RootLayout from '../Layouts/RootLayout'
import { Box, Button, Typography } from '@mui/material'
import lama from "../assets/bg.png"
import bot from "../assets/bot.png"
import bgBot from "../assets/bg.png"
import { Link } from 'react-router-dom'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
const Home = () => {
  return (
    <RootLayout>

        <Box className={`lg:grid lg:grid-cols-[50%,50%] bg-[url('${lama}')] w-[100%] lg:min-h-[80vh] m-auto`}>

            {/* leftSide */}

            <Box className="lg:w-[90%] text-white m-auto flex flex-col gap-1 items-center justify-center">
                <Typography 
                    className='text-[1.9rem] font-[600] lg:text-[3.8rem] lg:font-[700] textGradient'
                > It'sMoNdAy Ai </Typography>
                <Typography className='text-[1rem] lg:text-[1.6rem]'> Supercharge your creativity and productivity </Typography>
                <Typography className='text-[0.7rem] w-[80%] lg:text-[0.8rem] mt-4 lg:w-[80%] m-auto text-center'> 
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto sunt, vel fugit possimus cum molestias quis tenetur, tempore error reiciendis praesentium esse animi quod dicta, iusto nesciunt!
                </Typography>
                
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <Link to={"/dashboard"}><Button variant='outlined' className='lg:mt-5 my-3 rounded-[1rem] bg-[#1F70E5] hover:bg-[#1F70E5] text-white'>Get Started</Button></Link>

            </Box>

            {/* rightSide */}

            <Box className="m-auto bg-[#140e2d] max-w-[80%] mt-4 lg:m-auto lg:max-w-[60%] lg:min-h-[60%] overflow-hidden relative">
                <img src={bgBot} alt="" className='absolute top-0 opacity-40 bgBot'/>
                <Box className="flex items-center borBg justify-center lg:max-h-[100%] lg:max-w-[60%] m-auto">
                    <img src={bot} alt="" className='h-[10rem] lg:h-auto flex items-center justify-center'/>
                </Box>

            </Box>

        </Box>
    </RootLayout>
  )
}

export default Home