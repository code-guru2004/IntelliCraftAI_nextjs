// import mongoose from "mongoose"

// const connect = async()=>{
//     const DBUrl = "mongodb+srv://nayanhetc61:nayan@clusterx12.ivs06.mongodb.net/?retryWrites=true&w=majority&appName=Clusterx12";

//     mongoose.connect(DBUrl)
//     .then(()=>console.log("DB connected Successfully"))
//     .catch((e)=>console.log(e))
// }
// export default connect;

import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URL = "mongodb+srv://nayanhetc61:nayan@clusterx12.ivs06.mongodb.net/?retryWrites=true&w=majority&appName=Clusterx12";

interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConnection = (global as any).mongoose

if(!cached) {
  cached = (global as any).mongoose = { 
    conn: null, promise: null 
  }
}

export const connect = async () => {
  if(cached.conn) return cached.conn;

  if(!MONGODB_URL) throw new Error('Missing MONGODB_URL');

  cached.promise = 
    cached.promise || 
    mongoose.connect(MONGODB_URL, { 
      dbName: 'imaginify', bufferCommands: false 
    })

  cached.conn = await cached.promise;

  return cached.conn;
}





