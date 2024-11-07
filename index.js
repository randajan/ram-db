import slib, { argv } from "@randajan/simple-lib";
import ImportGlobPlugin from 'esbuild-plugin-import-glob';

const { isBuild, isServer } = argv;

slib(
    isBuild,
    {
        port: 3005,
        mode: isServer ? "node" : "web",
        rebuildBuffer:isServer? 500 : 100,
        minify: false,
        lib: {
            external: ["chalk"],
            entries: ["index.js", "async.js", "api/odata.js"]
        },
        demo:{
            dir:isServer?"demo/backend":"demo/frontend",
            external:isServer?["chalk"]:[],
            plugins: [ImportGlobPlugin.default()]
        }
})