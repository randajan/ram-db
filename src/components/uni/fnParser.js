
const unbracket = (str, br="()")=>{
    if (!str.startsWith(br[0])) { return str; }
    if (!str.endsWith(br[1])) { return; }
    return str.slice(1, -1).trim();
}

const _arg = /^[a-zA-Z_$][a-zA-Z_$0-9]*$/;
const parseFceArgs = (args)=>{
    if (args) { args = unbracket(args.trim()); }
    if (args == null) { return; }

    let result = [];
    if (args) {
        for (let a of args.split(",")) {
            a = a.trim();
            if (!_arg.test(a)) { return; }
            result.push(a);
        }
    }

    return result;
}

const _splitCommon = fstr=>{
    const lba = fstr.indexOf("(");
    if (lba < 0) { return; }
    fstr = fstr.slice(lba);

    const rba = fstr.indexOf(")")+1;
    if (rba <= 0) { return; }

    return [fstr.slice(0, rba).trim(), fstr.slice(rba).trim()];
}

const _splitArrow = fstr=>{
    const frags = fstr.split("=>");
    if (frags.length <= 1) { return; }
    return [frags.shift(), frags.join("=>").trim()];
}

const _split = fstr=>{
    fstr = fstr.trim().replace(/\s+/g, " ");
    return fstr.startsWith("function") ? _splitCommon(fstr) : _splitArrow(fstr);
}

const fceFrom = (any, type="string")=>{
    let body;
    if (type === "string") { body = `'${any}'`; }
    else if (type === "number" || type === "boolean") { body = `${any}`; }
    else if (any instanceof Date) { body = `new Date('${any}')`; }
    else if (type === "object") { body = `(${JSON.stringify(any)})`; }

    if (any != null && !body) { return; }
    return new Function(`return ${body}`);
}

export const strToFce = fstr=>{
    const t = typeof fstr;
    if (t !== "string") { return fceFrom(fstr, t); }

    const f = _split(fstr);
    if (!f) { return fceFrom(fstr); }

    const args = parseFceArgs(f[0]);
    if (!args) { return fceFrom(fstr); }

    let body = f[1];
    if (!body.startsWith("{")) { body = "return "+body; }
    else if (!body.endsWith("}")) { return fceFrom(fstr); }
    else { body.slice(1, -1); }

    return new Function(args, body);
}

export const fceToStr = fn=>{
    const t = typeof fn;
    if (t !== "function") { return fn; }

    const f = _split(fn.toString());
    if (!f) { return }

    let args = unbracket(f[0]);
    if (args == null) { return }
    if (!args || !_arg.test(args)) { args = `(${args})`; }

    let body = unbracket(f[1], "{}");
    if (!body.startsWith("return")) { body = `{${body}}`; }
    else {
        body = body.slice(6).trim();
        if (body.endsWith(";")) { body = body.slice(0, -1); }
        if (body.startsWith("{")) { body = "("+body+")"; }
        else if (body.endsWith("}")) { return; }
    }

    return `${args}=>${body}`;
    
}

