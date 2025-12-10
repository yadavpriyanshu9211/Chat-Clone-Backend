import { Chat } from "../models/chat.models.js";
import userModel from "../models/user.Model.js";


export const createChat = async (req, res) =>{
    try{
        const { id } = req.user;
        const {otherUserphone } = req.body;

        if(!otherUserphone){
            return res.status(404).json({
                Message:"This is a required field",
            });


        }

        // Check Other user


         const otherUser = await userModel.findOne({ phone: otherUserphone });

         if (!otherUser){
            return res
            .status(404).json({ Message: "User not found with this Phone Number "});

         }

        //  Pervent Self-chat

        if(!otherUser.id.toString()===id.toString()){
            return res.status(400).json({message:"Cannot create a chat with yourself "});
        }

        const existingChat = await Chat.findOne({
            isGroup:false,
            participants:{$all: [otherUser._id, id] },
        });

        if (existingChat) {
            return res.status(400).json({
                message:"Chat Alredy exist",
                chat:existingChat,
            });
        }

        const chat= await Chat.create({
            isGroup: false,
            participants: [otherUser._id, id ],

        });

        const fullChatDetails = await Chat.findById(chat._id).populate(
        "participants",
        "name about profileImage phone"

        );

        return res.status(201).json ({
            message:"Chat created successfully",
        });


    }catch (error){
        console.log("Internal Server Error");
        return res.status(500).json({error});
        
    }
}