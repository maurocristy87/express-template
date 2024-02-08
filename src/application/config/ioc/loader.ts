import fg from "fast-glob";
import path from "path";

const pathsToImport = [
    "./src/application/api/controller/**/*.ts", // controllers directory
    "./src/infrastructure/**/*.ts", // infrastructure directory
    "./src/domain/service/**/*.ts", // services directory
    "./src/application/cli/commands/**/*.ts", // cli directory
];

const entries = fg.sync(pathsToImport, { dot: true });

entries.forEach(function (file: string) {
    require(path.resolve(file));
});
