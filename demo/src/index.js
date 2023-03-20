import { Table } from "../../dist/index.js";
import jet from "@randajan/jet-core";

const testData = [
    {id:"row1"},
    {id:"row2"}
]

window.jet = jet;

window.test = new Table("test", tbl => {

    return {
        columns: (cols, set)=>(set({
            id:{isPrimary:true},
            readonly:{ isReadonly:true },
            free:{ isLabel:true },
            blaghul:{init:"blaghul"},
            virtual:{formula:(row)=>row("blaghul"), isVirtual:true},
            separator:{separator:"; "}
        })),
        rows: async (rows, set) => {
            await set(testData);
        },
        onChange:(...info)=>{
            console.log(...info);
        }
    }
})