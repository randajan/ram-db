

export const formatKey = key=>jet.isMapable(key) ? JSON.stringify(key) : String.jet.to(key);