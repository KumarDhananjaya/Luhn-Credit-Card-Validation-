import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: 'string',
            required: true,
            min: '2',
            max: '50',
        },
        lastName: {
            type: 'string',
            required: true,
            min: '2',
            max: '50',
        },
        email: {
            type: 'string',
            required: true,
            max: '50',
            unique: true,
        },
        password: {
            type: 'string',
            required: true,
            min: '5',
        },
    }, {
        timestamps: true,
    }
);

const User = mongoose.model("User", UserSchema);
export default User;