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

    constructor(ramdb, returnVals) {
        solid.all(this, {
            ramdb,
            returnVals:jet.isRunnable(returnVals) ? returnVals : _=>returnVals
        }, false);
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

    rowToResponse(context, row) {
        if (!row) { return; }
        return row.saved[this.returnVals(context) === true ? "vals" : "raws"];
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
        
        return this.rowToResponse(context, await tbl.rows.add(body));
    }
    
    async query(context) {
        const tbl = this.getTable(context);
        const { params } = context;
        //const { $select, $sort, $skip, $limit, $filter } = options;

        if (params.hasOwnProperty("id")) {
            return this.rowToResponse(context, await tbl.rows.get(params.id, false));
        } else {
            return tbl.rows.map(row=>this.rowToResponse(context, row)); 
        }
    }

    async count(context) {
        const tbl = this.getTable(context);

        return tbl.rows.count();
    }

}


export default (ramdb, options={})=>{
    const { filter, returnVals } = options;

    const _filter = jet.isRunnable(filter) ? filter : null;

    const _adapter = options.adapter = new RamDBAdapter(ramdb, returnVals);
    options.model = _adapter.generateModel.bind(_adapter);

    options.filter = async (context, entity, prop)=>{
        const rv = _adapter.returnVals(context) === true;
        if (!filter && (rv || !prop)) { return true; }
        const tbl = ramdb.get(entity);
        const col = prop ? await tbl.cols.get(prop) : undefined;
        if (!rv && col?.isVirtual) { return false; }
        return _filter ? _filter(context, tbl, col) : true;
    }

    return odataServer(options);
}