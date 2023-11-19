import jet from "@randajan/jet-core";

const { solid } = jet.prop;

export const vault = jet.vault("RamDBVault");

export const eventsWhen = ["before", "after"];
export const eventsRows = [].concat(
    ...eventsWhen.map(w=>["set", "update", "remove"].map(c=>[w, c, w+String.jet.capitalize(c)]))
);

export const formatKey = (key, def)=>key != null ? String(key) : def;
export const numberPositive = (num, def=0)=>num == null ? def : Math.max(0, Number.jet.to(num));
export const functionOrNull = val=>val == null ? undefined : Function.jet.to(val);

const _sortBy = (colName, descending=false, list=[])=>{
    const _sb = (colName, descending)=>_sortBy(colName, descending, list);
    solid(_sb, "list", list);
    list.push([colName, Boolean.jet.to(descending)]);
    return _sb;
}

export const sortBy = (colName, descending=false)=>_sortBy(colName, descending);


