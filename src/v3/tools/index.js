import { solid, solids } from "@randajan/props";
import * as files from "./traits/*";

export const tools = {};

for (const file of files.default) { solids(tools, file); }