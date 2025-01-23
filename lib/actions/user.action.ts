"use server";

import User from "../database/models/user.model";
import connect from "../database/mongoose";

export async function createUser(user: any) {
  try {
    await connect();
    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    console.log(error);
  }
}

export async function updateUser(id:string,user: UpdateUserParams) {
  try {
    await connect();
    const updatedUser = await User.findOneAndUpdate({id},user,{
      new:true,
    })
    if (!updatedUser) throw new Error("User update failed");
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    console.log(error);
  }
}