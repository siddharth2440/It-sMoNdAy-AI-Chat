import mongoose from "mongoose"

const dbConnection = async () => {
    mongoose
        .connect(process.env.MONGO_URl)
        .then(()=> {
            console.log("DB connected Successfully")
        })
        .catch((error)=>{
            console.log(error.message)
        })
}

export default dbConnection