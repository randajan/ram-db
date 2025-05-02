import { metaData, metaEnts } from "./interface";




export const isMetaEnt = _ent=>metaEnts.includes(_ent);

export const getMetaRow = (_ent, id)=>{
    if (isMetaEnt(_ent)) { return metaData[_ent][id]; }
}

export const rowMetaMerge = (_ent, id, rawRow)=>{
    const meta = getMetaRow(_ent, id);
    const row = { ...rawRow, _ent, id };
    if (!meta) { return row; }

    for (const colName in metaData._cols) {
        const col = metaData._cols[colName];
        if (col._ent !== _ent) { continue; }
        if (col.meta < 2 && row.hasOwnProperty(colName)) { continue; }
        row[colName] = meta[colName];
    }

    return row;
}