import vault from "../../uni/helpers/vault";

export const syncBuilder = chop=>{
    const _p = vault.get(chop.uid);
    _p.state = "pending";
    const data = _p.stream();
    if (Promise.jet.is(data)) { throw Error(chop.msg(`init failed - promise found at sync`)); }
    _p.loader(chop, data, _p.set);
    _p.state = "ready";
    return chop;
}