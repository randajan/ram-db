import { Table } from "../../dist/index.js";
import jet from "@randajan/jet-core";

const testData = [
    ["c1", "c2", "c3", "c4"],
    ["v1", "v2", "v3", "v4"]
]

window.jet = jet;

window.test = new Table("test", tbl => {

    return {
        loadCols: tbl => {
            data = jet.copy(testData, true);
            tbl.cols.set([
                {isPrimary:true},
                {isReadonly:true},
                2,
                {init:"blaghul"},
                {formula:_=>"hou", isVirtual:true}
            ]);
            //tbl.cols("c2").set(["isReadonly", "resetIf"], true);
        },
        loadRows: tbl => {
            tbl.rows.set(data);
        },
        onChange:(...info)=>{
            console.log(...info);
        }
    }
})