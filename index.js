import sapp from "@randajan/simple-lib";


sapp(false, {
    port:4002,
    entries:["index.js", "async.js"],
    external:["@randajan/jet-core"]
})