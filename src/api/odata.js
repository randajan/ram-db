import jet from "@randajan/jet-core";
import odataServer from "@randajan/odata-server";

const ramdbToODataType = {
    "ref":"Edm.String",
    "string":"Edm.String",
    "number":"Edm.Decimal",
    "datetime":"Edm.DateTimeOffset",
    "boolean":"Edm.Boolean",
}

const { solid } = jet.prop;

export class RamDBAdapter {


    constructor(ramdb) {
        solid(this, "ramdb", ramdb, false);
    }

    async generateModel() {
        const ramdb = this.ramdb;
        const namespace = ramdb.name;
        const entitySets = {};
    
        const entityTypes = ramdb.map(({name, cols})=>{
            entitySets[name] = { entityType:namespace+"."+name };
            return cols.map((col, name)=>{
                const prop = {};
    
                prop.type = ramdbToODataType[col.type];
                if (col.isPrimary) { prop.key = true; }
    
                return prop;
            }, { byKey:true });
        }, { byKey:true });
    
        return { namespace, entityTypes, entitySets }
    }

    getTable(context) {
        return this.ramdb.get(context.params.collection);
    }

    async remove(context) {
        const tbl = this.getTable(context);
        const { params } = context;

        const row = tbl.rows.get(params.id, false);
        if (!row) { throw {code:404, msg:"Not found"}; }


        return row.remove();
    }
    
    async update(context) {
        const tbl = this.getTable(context);
        const { params, getBody } = context;

        const row = tbl.rows.get(params.id, false);
        if (!row) { throw {code:404, msg:"Not found"}; }

        const body = await context.getBody(true);

        return row.update(body);
    }
    
    async insert(context) {
        const tbl = this.getTable(context);
        const { getBody } = context;

        const body = await getBody(true);

        const row = tbl.rows.add(body);

        return row.live.vals;
    }
    
    async query(context) {
        const tbl = this.getTable(context);
        const { params } = context;
        //const { $select, $sort, $skip, $limit, $filter } = options;

        if (params.hasOwnProperty("id")) {
            const row = tbl.rows.get(params.id, false);
            if (!row) { throw {code:404, msg:"Not found"}; }
            return [row.live.vals];
        } else {
            return tbl.rows.map(row=>row.live.vals); 
        }
    }

    async count(context) {
        const tbl = this.getTable(context);

        return tbl.rows.count();
    }

}


export default (ramdb, options={})=>{
    const adapter = options.adapter = new RamDBAdapter(ramdb);
    options.model = adapter.generateModel();
    return odataServer(options);
}