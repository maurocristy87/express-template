import { Container } from "inversify";
import { buildProviderModule } from "inversify-binding-decorators";

// add classes with @provideSingleton decorator into the container
export const loadDecorators = (container: Container): void => {
    container.load(buildProviderModule());
};
