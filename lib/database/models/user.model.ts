import { model, models, Schema } from "mongoose";

const userSchema = new Schema({
    clerkId:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        require:true,
        unique:true,
    },
    username:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true,
    },
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    planId:{
        type:Number,
        default:1,
    },
    creditBalance:{
        type:Number,
        default:10
    }
});

const User = models?.User || model('User' , userSchema);
export default User;