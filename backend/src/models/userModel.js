import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            dropDups: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
            dropDups: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);


const User = mongoose.model('Users', userSchema)

export default User; 
