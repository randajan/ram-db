import mongoose, { Model, Schema } from "mongoose";
import {map} from "@randajan/jet-core/eachSync";


export const ramDBToMongo = ents=>map(ents, (cols, ctx)=>mongoose.model(ctx.key, convertSchema(cols)));

const convertSchema = cols=>new Schema(map(cols, col=>convertColumn(col)));

const convertColumn = col=>{
    const type = col.type || "string";

    return {
        type:convertType(type)
    }
}


const convertType = colType=>{
    // ref:{val:String, raw:v=>v.key || v},

    if (colType === "boolean") { return Schema.Types.Boolean; }
    if (colType === "number") { return Schema.Types.Number; }
    if (colType === "datetime") { return Schema.Types.Date; }
    if (colType === "duration") { return Schema.Types.Number; }
    if (colType === "object") { return Schema.Types.Mixed; }
    //ref

    return String;
}