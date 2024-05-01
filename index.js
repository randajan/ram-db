import slib, { argv } from "@randajan/simple-lib";
import ImportGlobPlugin from 'esbuild-plugin-import-glob';


slib(argv.isBuild, {
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