import mongoose from "../db/conn";
import { Schema } from "mongoose";
import Music from "./Music";

const CD = mongoose.model(
    'CD',
    new Schema({
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        number_of_tracks: {
            type: Number,
            required: true
        },
        musics: Array,
        recordCompany: Object
    },
    { timestamps: true }
    )
)

export default CD