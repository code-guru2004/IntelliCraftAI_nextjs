import mongoose from "mongoose"

const connect = async()=>{
    const DBUrl = "mongodb+srv://nayanhetc61:nayan@clusterx12.ivs06.mongodb.net/?retryWrites=true&w=majority&appName=Clusterx12";

    mongoose.connect(DBUrl)
    .then(()=>console.log("DB connected Successfully"))
    .catch((e)=>console.log(e))
}
export default connect;