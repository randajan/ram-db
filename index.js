import sapp from "@randajan/simple-lib";


sapp(false, {
    port:4002,
    mode:"node",
    external:["chalk"],
    lib:{
        entries:["index.js", "async.js", "api/odata.js"]
    }
 
})