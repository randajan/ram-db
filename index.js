import slib from "@randajan/simple-lib";
import ImportGlobPlugin from 'esbuild-plugin-import-glob';


slib(process.env.NODE_ENV==="prod", {
    port:4002,
    mode:"web",
    
    minify:false,
    lib:{
        external:["chalk"],
        entries:["index.js", "async.js", "api/odata.js"]
    },
    demo:{
        plugins:[ImportGlobPlugin.default()]
    }
})