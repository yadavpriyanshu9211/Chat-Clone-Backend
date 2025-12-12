
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
};


// Get my Chat 

export const myChat = async (req,res)=>{

    try {
        const { id } =req.user;

        const chats = await Chat.find({participants:id,

        })
        .populate("participants","name about profileImage Phone ")
        .populate
        
        ("lastMessage")

        // .populate({
            // path: "lastMessage",
        //     populate : {path:"senderId",select:"name profileImage"},
        // })
        .sort({updatedAt: -1 });

        return res.status(200).json({message:"Fetched succesfully", chats});

        
    } catch (error) {
        console.error("Internal Server Error");
        return res.status(500).json({error});
        
    }
};


// GetChat By Phone 

export const getChatByPhone = async (req,res)=>{
    try {
        const { id } = req.user;
        const {otherUserPhone} = req.params;

        // chck existing User

        const otherUser= await userModel.find({phone: otherUserPhone});


        if (!otherUser) {
            return res
            .status(404)
            .json({message:"Chat not found with this phone number "});
        }

        // check exisitng Chat 

        const chat = await Chat.find ({
            isGroup:false,
            participants:{$all:[otherUser._id],}
        });


        if(!chat) {
            return res.status(404).json({message:"Chat not found "});
        }


        return res.status(200).json({
            message:"Chat fetched succesfully",chat
        });

    } catch (error) {
        console.error("Internal Server Error");
        return res.status(500).json({error});
        
    }
};

