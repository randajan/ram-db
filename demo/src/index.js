import { Table } from "../../dist/index.js";
import jet from "@randajan/jet-core";

window.jet = jet;

const testData = [
    {id:"row1"},
    {id:"row2"},
    {id:"row3"}
]

window.test = new Table("test", tbl => {

    return {
        columns: _=>{
            return {
                id:{isPrimary:true},
                readonly:{ isReadonly:true },
                free:{ isLabel:true },
                foo:{init:"bar"},
                virtual:{ formula:(row)=>row("foo") },
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