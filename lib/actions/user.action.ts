"use server";

import connect from "../database/mongoose";
import User from "../database/models/user.model";


export async function createUser(user: any) {
  try {
    await connect();
    console.log("jhjgh");
    
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}