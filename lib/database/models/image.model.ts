import { model, models, Schema,Document } from "mongoose";

// Interface for the Image document
export interface IImage extends Document{
    title: string;
    transformationType: string;
    publicId: string;
    secureUrl: string;
    width?: number;
    height?: number;
    config?: object; // For an object with dynamic properties
    transformationUrl?: string;
    aspectRatio?: string;
    color?: string;
    prompt?: string;
    author?: {
        _id: string,
        firstName: string,
        lastName: string,
    }; // Reference to User model (ObjectId)
    createdAt?: Date;
    updatedAt?: Date;
  }

const imageSchema = new Schema({
    title: {
        type:String,
        required:true,
    },
    transformationType:{
        type:String,
        required: true,
    },
    publicId: {
        type:String,
        required:true,
    },
    secureUrl:{
        type:URL,
        required:true,
    },
    width:{
        type:Number,

    },
    height:{
        type:Number,
    },
    config:{
        type:Object,
    },
    transformationUrl: {
        type:URL,
    },
    aspectRatio:{
        type:String,
    },
    color:{
        type:String,
    },
    prompt:{
        type:String,
    },
    author:{
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    updatedAt:{
        type:Date,
        default: Date.now,
    },

});

const Image = models.Image || model('Image' ,imageSchema);

export default Image;