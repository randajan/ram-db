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
        const entityTypes = {};

        for (const {name, cols} of ramdb.getList()) {
            entitySets[name] = { entityType:namespace+"."+name };
            const entityType = entityTypes[name] = {};
            for (const { name, type, isPrimary } of await cols.getList()) {
                const prop = entityType[name] = {};
                prop.type = ramdbToODataType[type];
                if (await isPrimary) { prop.key = true; }
            }
        };
    
        return { namespace, entityTypes, entitySets }
    }

    getTable(context) {
        return this.ramdb.get(context.params.entity);
    }

    async remove(context) {
        const tbl = this.getTable(context);
        const { params } = context;

        const row = await tbl.rows.get(params.id, false);
        if (!row) { return; }

        await row.remove();

        return true;
    }
    
    async update(context) {
        const tbl = this.getTable(context);
        const { params } = context;

        const row = await tbl.rows.get(params.id, false);
        if (!row) { return; }

        const body = await context.pullRequestBody({});

        await row.update(body);

        return true;
    }
    
    async insert(context) {
        const tbl = this.getTable(context);
        const body = await context.pullRequestBody({});
        
        const row = await tbl.rows.add(body);

        return row?.saved.vals;
    }
    
    async query(context) {
        const tbl = this.getTable(context);
        const { params } = context;
        //const { $select, $sort, $skip, $limit, $filter } = options;

        if (params.hasOwnProperty("id")) {
            const row = await tbl.rows.get(params.id, false);
            return row?.saved.vals;
        } else {
            return tbl.rows.map(row=>row.saved.vals); 
        }
    }

    async count(context) {
        const tbl = this.getTable(context);

        return tbl.rows.count();
    }

}


export default (ramdb, options={})=>{
    const adapter = options.adapter = new RamDBAdapter(ramdb);
    options.model = adapter.generateModel.bind(adapter);
    return odataServer(options);
}