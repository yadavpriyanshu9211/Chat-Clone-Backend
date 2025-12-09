import mongoose, { Schema } from "mongoose";

const ChatSchema = Schema(
    {
        isGroup:{
            type:Boolean,
            default:false,
        },

//  participants

        participants :[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"User",
                required:true,

            },
        ],

        // Last message 
        lastMessage : {
            type : mongoose.Schema.Types.ObjectId,
            ref :"Message"
        },
    },
    {timestamps:true }
);

export const Chat=mongoose.model("Chat",ChatSchema);