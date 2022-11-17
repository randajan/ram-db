import { Table } from "../../dist/index.js";
import jet from "@randajan/jet-core";

const testData = [
    ["c1", "c2", "c3", "c4"],
    ["v1", "v2", "v3", "v4"]
]

window.jet = jet;

window.test = new Table("test", _ => {
    let tblx, data;

    return {
        loadCols: tbl => {
            tblx = tbl;
            data = jet.copy(testData, true);
            tbl.cols.set([
                {name:"col1", isPrimary:true},
                {name:"col2", isReadonly:true},
                "col3",
                {name:"col4", init:"blaghul"},
                {name:"col5", formula:_=>"hou", isVirtual:true}
            ]);
            //tbl.cols("c2").set(["isReadonly", "resetIf"], true);
        },
        loadRows: tbl => {
            //tbl.rows.load(data);
        },
        getRow: rowId => data[rowId],
        setRow: (rowId, raws) => {
            data[rowId] = raws || Array(tblx.cols.count);
            return true;
        },
        lastId: () => data.length-1,
        onChange:_=>{
            console.log(jet.compare(data, testData, true));
        }
    }
})