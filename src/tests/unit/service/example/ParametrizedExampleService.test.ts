// This test is only an example of how to do Unit testing and mock dependencies
import { ParametrizedExampleService } from "@service/example/ParametrizedExampleService";

describe("Parametrized Example Service", () => {
    const value = 1;
    const service = new ParametrizedExampleService(value);

    it("Succeeds", async () => {
        const obtainedValue = service.getValue();
        expect(obtainedValue).toEqual(value);
    });
});
