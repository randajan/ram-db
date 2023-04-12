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

    generateModel() {
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
        const col = await this.getCollection(context);

        const { options } = context;
        const { $filter } = this.optValidate({ $filter:options.$filter });
    
        const res = await col.deleteOne($filter);
    
        if (res.deletedCount < 1) { throw {code:410, msg:"Gone"}; }
        return res.deletedCount;
    }
    
    async update(context) {
        const col = await this.getCollection(context);

        const { options, getBody } = context;
        const { $filter } = this.optValidate({ $filter:options.$filter });

        const res = await col.updateOne($filter, {$set:await getBody(true)});
    
        if (res.matchedCount < 1) { throw {code:410, msg:"Gone"}; }
        return res.matchedCount;
    }
    
    async insert(context) {
        const col = await this.getCollection(context);

        const { primaryKey } = context.entity;
        const body = await context.getBody(true);

        if (primaryKey !== "_id" && !body[primaryKey]) { body[primaryKey] = jet.uid(16); }
    
        const value = await col.insertOne(body);
    
        return col.findOne({ _id: value.insertedId });
    }
    
    async query(context) {
        const tbl = this.getTable(context);

        const { options } = context;
        const { $select, $sort, $skip, $limit, $filter } = options;

        return tbl.rows.map(row=>row.live.vals);   
    }

    async count(context) {
        return this.query(context);
    }

}


export default (ramdb, options={})=>{
    const adapter = options.adapter = new RamDBAdapter(ramdb);
    options.model = adapter.generateModel();
    return odataServer(options);
}