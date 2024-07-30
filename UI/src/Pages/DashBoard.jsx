import React, { useState } from 'react'
import DashboardLayout from '../Layouts/DashboardLayout'
import { Box, Button, CircularProgress, TextField, Typography } from '@mui/material'
// import { AttachFile } from '@mui/icons-material'
import Upload from '../uploads/Upload.jsx'
import model from '../lib/gemini.js'
import { IKImage } from 'imagekitio-react'
// import model from "../lib/gemini.js "
import Markdown from "react-markdown"
import axiosInstance from '../helpers/axiosInstance.js'
import { Try } from '@mui/icons-material'
const DashBoard = () => {
    const [question,setQuestion] = useState("")
    const [answer,setAnswer] = useState("")
    
    const [img, setImg] = useState({
        isLoading: false,
        error: "",
        dbData: {},
        aiData: {},
      });
    
    // const chat = model.startChat({
    //     history: [
    //       {
    //         role: "user",
    //         parts: [{ text: "Hello, I have 2 dogs in my house." }],
    //       },
    //       {
    //         role: "model",
    //         parts: [{ text: "Great to meet you. What would you like to know?" }],
    //       },
    //     ],
    //     generationConfig: {
    //     //   maxOutputTokens: 100,
    //     },
    // });

    const add = async (text) => {
        const result = await model.generateContentStream(
            Object.entries(img.aiData).length ? [img.aiData, text] : [text]
          );
          let accumulatedText = "";
          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            // console.log(chunkText);
            accumulatedText += chunkText;
            setAnswer(accumulatedText);
          }
    }

    const handleSubmit =async (e) => {
        e.preventDefault();
        const text = e.target.text.value;
        console.log(text);
        if(!text) return;
        try {
            await axiosInstance.get("/api/chats")
        } catch (error) {
            console.log(error.message);
        }
        setQuestion(text);
        add(text);
        setImg({
            isLoading: false,
            error: "",
            dbData: {},
            aiData: {},
          })
        return;
    }
  return (
    <DashboardLayout>
        <Box className="bg-[#11101C] w-[100%] lg:w-[70%] mx-auto px-3 lg:py-4 pb-[3rem] h-[80vh] relative">
            {/* <h1 className='text-white'>Hello Worl I Me and Okay Varun is going to be great One Day myself</h1> */}
            <Box className="flex flex-col gap-2 px-2 items-start justify-start overflow-auto py-10 h-[100%] text-white w-[90%] m-auto">
                {
                    img.dbData?.filePath && (
                        <IKImage
                            urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                            path={img.dbData?.filePath}
                            width="380"
                            transformation={[{ width: 380 }]}
                            className='message-user'
                        />
                )}
                {
                    img.isLoading && (
                        <CircularProgress className='message-user'/>
                    )
                }
                {
                    question && (
                        <Typography className="message-user bg-[#272734] lg:px-4 lg:py-2 px-2 py-2 text-[0.7rem] rounded-lg">{question}</Typography>
                    )
                }
                {
                    answer && (
                        <Typography className="message-ai bg-[#272734] lg:px-4 lg:py-2 px-2 py-2 text-[0.7rem] rounded-lg">
                            <Markdown>
                            {answer}
                            </Markdown>
                        </Typography>
                    )
                }


            </Box>

            <form onSubmit={handleSubmit} className="lg:w-[80%] absolute bottom-1 m-auto flex gap-2  overflow-hidden items-center lg:h-[5vh] bg-[#272728] justify-center rounded-lg">
                <Box className="w-[10%] flex items-center rounded-[50%] py-2 justify-center">
                    {/* <label htmlFor="file"> <AttachFile className='text-white ' /> </label> */}
                    <Upload setImage={setImg}/>
                    <input type="file" hidden name="file" multiple={false} id="file" />
                </Box>
                <Box className="w-[90%] lg:w-[80%] flex items-center py-3 justify-center h-[100%]">
                    {/* <label htmlFor="file"> <AttachFile className='text-white ' /> </label> */}
                    <input type="text" name="text" multiple={false} id="" className='py-3 text-white bg-[#272728] h-[100%] px-2 outline-none w-[100%]'/>
                </Box>
                <Button type="submit" className='bg-[#262634] hover:bg-[#262634] lg:w-auto lg:h-[100%] text-white'>Ask</Button>
            </form>

        </Box>
    </DashboardLayout>
  )
}

export default DashBoard