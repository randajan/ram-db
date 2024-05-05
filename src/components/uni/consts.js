import jet from "@randajan/jet-core";

const { solid, cached } = jet.prop;

export const vault = new WeakMap();

const eventsWhen = ["before", "after"];
export const events = cached.all({}, {}, {
    primitive:_=>[].concat(
        ...eventsWhen.map(w=>["set", "update", "remove"].map(c=>[w, c, w+String.jet.capitalize(c)]))
    ),
    extra:_=>[].concat(
        ...eventsWhen.map(w=>["change", "save"].map(c=>[w, c, w+String.jet.capitalize(c)]))
    )
});



export const formatKey = (key, def)=>key != null ? String(key) : def;
export const numberPositive = (num, def=0)=>num == null ? def : Math.max(0, Number.jet.to(num));
export const functionOrNull = val=>val == null ? undefined : Function.jet.to(val);
export const boolDef = (val, def)=>val == null ? def : !!val;


const _sortBy = (colName, descending=false, list=[])=>{
    const _sb = (colName, descending)=>_sortBy(colName, descending, list);
    solid(_sb, "list", list);
    list.push([colName, Boolean.jet.to(descending)]);
    return _sb;
}

export const sortBy = (colName, descending=false)=>_sortBy(colName, descending);


