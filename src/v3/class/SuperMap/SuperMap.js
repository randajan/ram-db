


export class SuperMap extends Map {

    getAll(groupId) {
        return super.get(groupId);
    }

    get(groupId, keyId) {
        return super.get(groupId)?.get(keyId);
    }

    has(groupId, keyId) {
        const sub = super.get(groupId);
        return (sub && sub.has(keyId));
    }

    set(groupId, keyId, obj) {
        let sub = super.get(groupId);

        if (!sub) { super.set(groupId, sub = new Map()); }
        sub.set(keyId, obj);
    }

    delete(groupId, keyId) {
        const sub = super.get(groupId);

        if (!sub) { return; }
        else if (sub.size <= 1) { super.delete(groupId); }
        else { sub.delete(keyId); }
    }

}


