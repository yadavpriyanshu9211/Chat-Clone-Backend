import mongoose, { Mongoose, Types } from "mongoose";

const GroupSchema = new mongoose.Schema(
    {
        ChatId:{

            Type: mongoose.Schema.Type.ObjectId,
            ref:"Chat",
            required:true,
        },

        // Name
        name:{

            type: String,
            default: "Group Name",
            trim: true,
        },

        // Icons

        icons:{

            type: String,
            default: null,
        },

        // Description

        description:{

            type: String,
            default: "",
        },

        // Created By

        createdBy:{

            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        // Admin

        admins:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",

        },
    ],

        // Member

        members:[
            {
                type: Mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],



    },
{timestamps:true}
);

export const Group = mongoose.model("Group",GroupSchema)