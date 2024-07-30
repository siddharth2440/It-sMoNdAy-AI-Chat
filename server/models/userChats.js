import { Schema,model } from "mongoose"

const userChatsSchema = new Schema({
    userId:{
        type:String,
        required:[true,"userId is required"],
    },
    chats:[
        {
            chatId:{
                type:String,
                required:[true,"chatId is required"]
            },
            title:{
                type:String,
                required:[true,"chatId is required"]
            },
            createdAt:{
                type:Date,
                default:Date.now()
            }

        }
    ]
},{timestamps:true})


const userChatsModel = model("chat",userChatsSchema)

export default userChatsModel;