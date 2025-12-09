import mongoose, { Mongoose } from "mongoose";

const MessageSchema = new mongoose.Schema(
    {
 // CHAT ID
        chatId: {
            type : mongoose.Schema.Types.ObjectId,
            ref:"Chat",
            required: true,
        },
// Sender ID
        senderId:{
            type: Mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },

// Context

context:{
    type: String,
    default:"",
},

// MediaURL
mediaURL:{
    type: String,
    default:null,
},

// Mesage Type

messageType:{
    type:String,
    enum:["text","image","video"],
    default:"text",
},

// Delivered To

deliveredTo:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
 ],

 // Read By

readBy:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
 ],

 // Delete for

deleteFor:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
 ],
},
{ timestamps: true}
);

export const Message= mongoose.model("Message",MessageSchema)