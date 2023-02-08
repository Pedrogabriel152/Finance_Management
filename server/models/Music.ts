import mongoose from "../db/conn";
import { Schema } from "mongoose";

const Music = mongoose.model(
    'Music',
    new Schema({
        name: {
            type: String,
            required: true
        },
        duration: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        cd: Object,
        recordCompany: Object
    },
    { timestamps: true }
    )
)

export default Music