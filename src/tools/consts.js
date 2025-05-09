

export const vault = new WeakMap();

export const fcePass = v=>v;
export const fceNone = ()=>{};
export const fceTrue = _=>true;

export const boleanString = /^(0|f|(no?t?)|off|false|undefined|null|NaN)$/i;

export const propNameBlacklist = [
    "constructor",           // Object konstruktor
    "__proto__",             // přímý přístup k prototype chain
    "hasOwnProperty",        // důležitá metoda pro práci s vlastnostmi
    "isPrototypeOf",         // používá se v dědičnosti
    "propertyIsEnumerable",  // zjišťuje, zda je vlastnost výčtová
    "toLocaleString",        // převod pro lokalizaci
    "toString",              // převod na řetězec
    "valueOf",               // převod na primitivní hodnotu
    "toJSON"                 // výstup při JSON.stringify()
];