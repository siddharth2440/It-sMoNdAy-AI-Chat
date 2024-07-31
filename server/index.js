import express from "express"
import { config } from "dotenv"
import ImageKit from "imagekit";
import cors from "cors"
import bodyParser from "body-parser"

import dbConnection from "./db/dbConnection.js"
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node"
import Chat from "./models/chat.js"
import UserChat from "./models/userChats.js"

const app = express()
config();

const PORT = process.env.PORT ;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
    // allowedHeaders:"*"
}))

const imagekit = new ImageKit({
    privateKey:process.env.IMAGE_KIT_PRIVATE_KEY,
    publicKey:process.env.IMAGE_KIT_PUBLIC_KEY,
    urlEndpoint:process.env.IMAGE_KIT_URL_ENDPOINT
})


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(401).send("Unauthenticated!");
});


app.get("/api/test",(req,res)=>{
    console.log(req.body)
    console.log("Yaha toh aa rha hai")
    res.status(200).json({message:"Succesfuyyyt Callde"})
})
app.get("/upload",async (req,res) => {
    console.log("SuceessFullyCalled");
    const result = imagekit.getAuthenticationParameters()
    console.log(result);
    return res.status(200).json(result)
})

app.post("/chats",ClerkExpressRequireAuth(), async (req,res)=>{
    console.log("From mobile is api hitting")
    const {userId} = req.auth
    const {text} = req.body;
    try{

        // CREATE THE NEWCHAT WITH AI
        const newChat = new Chat({
            userId,
            history:[{role:"user",parts:[{text}]}]
        })
        const savedChat = await newChat.save();

        // Check IF THE USER ALREADY EXISTS OR NOT
        const isUserAlreadyExists = await UserChat.find({userId});

        // If doesn't exists then create new one
        if(isUserAlreadyExists.length == 0){
            // console.log("Inside")

            let newUserChat = new UserChat({
                userId,
                chats:[
                    {
                        chatId:savedChat._id,
                        title:text.substring(0,40)
                    }
                ]
            })
            // console.log("New User CHat")
            // console.log(newUserChat)
            await newUserChat.save();
        }

        // Yet to be done
        else{
            await UserChat.updateOne({userId},{
                $push:{
                    chats:{chatId:savedChat._id,title:text.substring(0,40)}
                }
            })
        }
        return res.status(200).json({
        message:"Chat is done"})
    }catch(error){
        return res.status(400).json(error.message)
    }
})

app.get("/api/getAllChats",ClerkExpressRequireAuth(),async (req,res)=> {
    try{
        const {userId} = req.auth
        console.log("Hitted");
        console.log("userId"+userId)
        const getAllChats = await UserChat.findOne({userId});
        console.log(getAllChats.chats)
        return res.status(200).json(getAllChats.chats)
    }catch(error){
        return res.status(400).json(error)
    }
})


app.listen(PORT,()=> {
    dbConnection();
    console.log(`Server is running in the PORT :- ${PORT}`)
})