import express from "express"
import { config } from "dotenv"
import ImageKit from "imagekit";
import cors from "cors"
const app = express()

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

app.get("/upload",async (req,res) => {
    console.log("SuceessFullyCalled");
    const result = imagekit.getAuthenticationParameters()
    console.log(result);
    return res.status(200).json(result)
})

app.get("/temp",(req,res)=>{
    console.log("Idhar dekhle");
    res.send("Idhar dekhle")
})

app.listen(PORT,()=> {
    console.log(`Server is running in the PORT :- ${PORT}`)
})