import vault from "../../uni/helpers/vault";

export const asyncBuilder = async chop=>{
    const _p = vault.get(chop.uid);
    _p.state = "pending";
    const data = await _p.stream();
    await _p.loader(chop, data, _p.set);
    _p.state = "ready";
    return chop;
}