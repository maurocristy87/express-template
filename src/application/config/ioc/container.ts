import { Container } from "inversify";
import { loadParameters } from "./parameters";
import { loadLogger } from "./logger";
import { loadDecorators } from "./decorator";
import "./loader";

export const createContainer = (): Container => {
    const container = new Container();

    loadLogger(container);
    loadParameters(container);
    loadDecorators(container);

    return container;
};
