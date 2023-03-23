import { Table } from "../../dist/index.js";
import jet from "@randajan/jet-core";

const testData = [
    {id:"row1"},
    {id:"row2"},
    {id:"row3"}
]

window.jet = jet;

window.test = new Table("test", tbl => {

    return {
        columns: _=>{
            return {
                id:{isPrimary:true},
                readonly:{ isReadonly:true },
                free:{ isLabel:true },
                blaghul:{init:"blaghul"},
                virtual:{ formula:(row)=>row("blaghul") },
                separator:{separator:"; "}
            }
        },
        rows: _=>{
            return testData;
        },
        onChange:(...info)=>{
            console.log(...info);
        }
    }
})