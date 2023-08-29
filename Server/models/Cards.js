import mongoose from "mongoose";

const cards = new mongoose.Schema(
    {
        userId: {
            type: 'string',
            required: true,
        },
        cardNumber: {
            type: 'string',
            required: true,
        },
        cardHolder: {
            type: 'string',
            required: true,
        },
        expiryDate: {
            type: 'string',
            required: true,
        }

    }, {
        timestamps: true,
    }
);

const Post = mongoose.model("Cards", cards);
export default Post;