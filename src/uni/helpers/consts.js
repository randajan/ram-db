


export const chopEvents = ["beforeInit", "afterInit", "beforeSet", "afterSet", "beforeRemove", "afterRemove"];

export const colsTraits = {
    isPrimary: "primary",
    isLabel: "label"
};

export const colTraits = {
    type: String,
    isReadonly: Function,
    resetIf: Function,
    init: Function,
    formula: Function,
    ref: Function,
    separator: String,
    isVirtual: Boolean
};