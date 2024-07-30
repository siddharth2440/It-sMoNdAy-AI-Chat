import express from "express"
import { config } from "dotenv"
import ImageKit from "imagekit";
import cors from "cors"
const app = express()
import dbConnection from "./db/dbConnection.js"
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node"
import Chat from "./models/chat.js"
import UserChats from "./models/userChats.js"
config();

const PORT = process.env.PORT ;
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true,
    allowedHeaders:"*"
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

app.get("/upload",async (req,res) => {
    console.log("SuceessFullyCalled");
    const result = imagekit.getAuthenticationParameters()
    console.log(result);
    return res.status(200).json(result)
})

app.get("/api/chats",ClerkExpressRequireAuth(), async (req,res)=>{
    console.log("Idhar dekhle");
    const {userId} = req.auth
    console.log(userId);
    const {text} = req.body;
    try{
        // CREATE THE NEWCHAT WITH AI
        const newChat = new Chat({
            userId,
            history:[{role:"user",parts:[{text}]}]
        })

        const savedChat = await newChat.save();

        // Check IF THE USER ALREADY EXISTS OR NOT
        const isUserAlreadyExists = await UserChats.find({userId});

        // If doesn't exists then create new one
        if(!isUserAlreadyExists.length){
            const newUserChat = new UserChats({
                userId,
                chats:[
                    {chatId:savedChat._id,title:text.subString(0,40)}
                ]
            })
        }


        // Yet to be done



    }catch(error){

    }

    return res.send("Idhar dekhle")
})

app.listen(PORT,()=> {
    dbConnection();
    console.log(`Server is running in the PORT :- ${PORT}`)
})