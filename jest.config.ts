import { pathsToModuleNameMapper } from "ts-jest/utils";
import type { Config } from "@jest/types";
import { compilerOptions } from "./tsconfig.paths.json";

// Sync object
const config: Config.InitialOptions = {
    preset: "ts-jest",
    testEnvironment: "node",
    modulePathIgnorePatterns: ["<rootDir>/dist/"],
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    moduleNameMapper: {
        ...pathsToModuleNameMapper(compilerOptions.paths),
    },
};
export default config;
