"use server"

import { revalidatePath } from "next/cache";
import { connect } from "../database/mongoose"
import { handleError } from "../utils"
import User from "../database/models/user.model";
import Image from "../database/models/image.model";
import { redirect } from "next/navigation";

const populateUser=(query:any)=> query.populate({
    path: 'author',
    model: "User",
    select: '_id firstName lastName email'
})
// ADD IMAGE TO DB
export async function addImage({image , userId , path}: AddImageParams) {
    try {
        await connect();

        const author = await User.findById(userId);

        if(!author){
            throw new Error("User not found")
        }

        const newImage = await Image.create({
            ...image,
            author: author?._id,
        })
        revalidatePath(path)

        return JSON.parse(JSON.stringify(image))
    } catch (error) {
        handleError(error)
    }
}

// UPDATE THE IMAHE
export async function updateImage({image , userId , path}: UpdateImageParams) {
    try {
        await connect();

        const imageToUpdate = await Image.findById(image._id);

        if(!imageToUpdate || imageToUpdate?.author?.toHexString() !== userId){
            throw new Error("Image not found")
        }

        const updatedImage = Image.findByIdAndUpdate(imageToUpdate?._id , image , {new:true})
        revalidatePath(path)

        return JSON.parse(JSON.stringify(updatedImage))
    } catch (error) {
        handleError(error)
    }
}

// DELETE IMAGE
export async function deleteImage(imageId: string) {
    try {
        await connect();

        await Image.findByIdAndDelete(imageId)
        
    } catch (error) {
        handleError(error)
    }
    finally{
        redirect("/");
    }
}

// GET IMAGE BY ID
export async function getImage(imageId : string) {
    try {
        await connect();

        const image = await populateUser(Image.findById(imageId))

        if(!image){
            throw new Error("No Image Found")
        }
        

        return JSON.parse(JSON.stringify(image))
    } catch (error) {
        handleError(error)
    }
}