import mongoose from "../db/conn";
import { Schema } from "mongoose";

const RecordCompany = mongoose.model(
    'RecordCompany',
    new Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        site: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
    )
)

export default RecordCompany