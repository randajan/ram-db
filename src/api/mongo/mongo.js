import mongoose, { Model, Schema } from "mongoose";

import meta from "../meta";
import { ramDBToMongo } from "./ramDBToMongo";



const mongoInit = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/game-destiny');

    const ents = ramDBToMongo(meta);

}

mongoInit();