import { Schema,model } from "mongoose"

const chatSchema = new Schema({
    userId:{
        type:String,
        required:[true,"userId is required"],
    },
    history:[
        {
            role:{
                type:String,
                enum:["user","model"],
                required:[true,"Role is required"],
            },
            parts:[
                {
                    text:{
                        type:String,
                        required:[true,"Text is required"],
                    }
                }
            ],
            img:{
                type:String,
                default:null,
            }
        }
    ]
},{timestamps:true})


const chatModel = model("chat",chatSchema)

export default chatModel;