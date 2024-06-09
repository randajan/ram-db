import jet from "@randajan/jet-core";
import odataServer from "@randajan/odata-server";

const ramdbToODataType = {
    "ref":"Edm.String",
    "string":"Edm.String",
    "number":"Edm.Decimal",
    "datetime":"Edm.DateTimeOffset",
    "boolean":"Edm.Boolean",
    "duration":"Edm.Duration",
    "object":"Edm.String" //for now
}

const { solid } = jet.prop;

export class RamDBAdapter {

    constructor(ramdb, returnVals, fakeRemove, typesTable={}) {
        solid.all(this, {
            ramdb,
            fakeRemove:String.jet.to(fakeRemove),
            returnVals:jet.isRunnable(returnVals) ? returnVals : _=>returnVals,
            typesTable:{...ramdbToODataType, ...typesTable}
        }, false);
    }

    async generateModel() {
        const { ramdb, fakeRemove } = this;
        const namespace = ramdb.name;
        const entitySets = {};
        const entityTypes = {};

        for (const {name, cols} of await ramdb.getList()) {
            entitySets[name] = { entityType:namespace+"."+name };
            const entityType = entityTypes[name] = {};

            for (const { name, type, isPrimary } of await cols.getList()) {
                const prop = entityType[name] = {};
                prop.type = this.typesTable[type];
                if (await isPrimary) { prop.key = true; }
            }

            if (fakeRemove) { entityType[fakeRemove] = { type:"Edm.Boolean" }; } //workaround appsheet bug - fake column for remove
        };
    
        return { namespace, entityTypes, entitySets }
    }

    async getTable(context) {
        return this.ramdb.get(context.params.entity);
    }

    rowToResponse(context, row) {
        if (!row) { return; }

        const returnVals = this.returnVals(context) === true;

        return async colName=>{
            if (colName === "$$remove") { return; }
            return returnVals ? row.get(colName) : row.getRaw(colName);
        };
    }

    async remove(context) {
        const tbl = await this.getTable(context);
        const { params } = context;

        const row = await tbl.rows.get(params.id, false);
        if (!row) { return; }

        await row.remove();

        return true;
    }
    
    async update(context) {
        const tbl = await this.getTable(context);
        const { params } = context;

        const row = await tbl.rows.get(params.id, false);
        if (!row) { return; }

        const body = await context.pullRequestBody({});

        if (body && this.fakeRemove && Boolean.jet.to(body[this.fakeRemove])) {
            await row.remove(); //workaround appsheet bug - fake column for remove
        } else {
            await row.update(body);
        }

        return true;
    }
    
    async insert(context) {
        const tbl = await this.getTable(context);
        const body = await context.pullRequestBody({});
        
        return this.rowToResponse(context, await tbl.rows.add(body));
    }
    
    async query(context) {
        const tbl = await this.getTable(context);
        const { primaryKey } = await context.fetchEntity();
        const options = await context.fetchOptions();
        const { $select, $sort, $skip, $limit, $filter } = options;

        if ($filter?.hasOwnProperty(primaryKey)) {
            return this.rowToResponse(context, await tbl.rows.get($filter[primaryKey], false));
        } else {
            return tbl.rows.map(row=>this.rowToResponse(context, row)); 
        }
    }

    async count(context) {
        const tbl = await this.getTable(context);

        return tbl.rows.count();
    }

}


export default (ramdb, options={})=>{
    const { filter, returnVals, fakeRemove, typesTable } = options;

    const _filter = jet.isRunnable(filter) ? filter : null;

    const _adapter = options.adapter = new RamDBAdapter(ramdb, returnVals, fakeRemove, typesTable);
    options.model = _adapter.generateModel.bind(_adapter);

    options.filter = async (context, entity, prop)=>{
        if (prop === _adapter.fakeRemove) { return true; } //workaround appsheet bug - fake column for remove
        const rv = _adapter.returnVals(context) === true;
        if (!filter && (rv || !prop)) { return true; }
        const tbl = await ramdb.get(entity);
        const col = prop ? await tbl.cols.get(prop) : undefined;
        if (col && !col.display) { return false; }
        return _filter ? _filter(context, tbl, col) : true;
    }

    return odataServer(options);
}