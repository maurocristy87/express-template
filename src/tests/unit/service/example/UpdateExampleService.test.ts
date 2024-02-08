// This test is only an example of how to do Unit testing and mock dependencies
import { Example } from "@entity/Example";
import { UpdateExampleService } from "@service/example/UpdateExampleService";
import { IConnectionManager } from "@mongodb/ConnectionManager";
import { ExampleRepository } from "infrastructure/repository/ExampleRepository";
import { examples } from "tests/Helpers";

jest.mock("infrastructure/repository/ExampleRepository");

describe("Update Example Service", () => {
    const repository = new ExampleRepository({} as IConnectionManager);
    const service = new UpdateExampleService(repository);

    it("Success", async () => {
        await service.update(examples[0], { value: "new value" });

        expect(repository.persist).toHaveBeenCalledTimes(1);
        expect(examples[0].id).toEqual(1);
        expect(examples[0].value).toEqual("new value");
    });
});
