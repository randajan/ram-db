import jet from "@randajan/jet-core";

export const addTrait = (obj, name, get, set, propertyPrefix="", setPrefix="")=>{

    const cname = String.jet.capitalize(name);

    propertyPrefix = String.jet.to(propertyPrefix);
    setPrefix = String.jet.capitalize(setPrefix);

    const property = propertyPrefix ? propertyPrefix + cname : name;
    const setProperty = "set" + (setPrefix ? setPrefix : "") + cname;

    Object.defineProperty(obj, property, { get, set, enumerable:true });
    Object.defineProperty(obj, setProperty, { value:set });

    return property;
}