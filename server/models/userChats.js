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
            }

        }
    ]
},{timestamps:true})


const userChatsModel = new model("userChats",userChatsSchema)

export default userChatsModel;