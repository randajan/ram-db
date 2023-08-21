import sapp from "@randajan/simple-lib";


sapp(process.env.NODE_ENV==="prod", {
    port:4002,
    mode:"node",
    external:["chalk"],
    minify:false,
    lib:{
        entries:["index.js", "async.js", "api/odata.js"]
    }
 
})