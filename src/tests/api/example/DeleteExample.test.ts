// This test is only an example of how to do API testing
import supertest from "supertest";
import { TYPES } from "@types";
import { ConnectionManager } from "@mongodb/ConnectionManager";
import { bootstrapApplication } from "application/config/bootstrap";
import e from "express";
import { Container } from "inversify";
import { Server } from "http";
import { collectionName } from "infrastructure/repository/ExampleRepository";
import { examples } from "tests/Helpers";

describe("Delete Example", () => {
    let app: e.Application, container: Container;
    let request: supertest.SuperTest<supertest.Test>;
    let server: Server;

    beforeAll(async () => {
        const application = await bootstrapApplication();

        app = application.app;
        container = application.container;
        server = application.server;
        request = supertest(app);

        await container
            .get<ConnectionManager>(TYPES.ConnectionManager)
            .getCollection(collectionName)
            .insertMany(examples);
    });

    afterAll(async () => {
        await container.get<ConnectionManager>(TYPES.ConnectionManager).getCollection(collectionName).drop();
        await container.get<ConnectionManager>(TYPES.ConnectionManager).close();
        server.close();
    });

    it("Success", async () => {
        const response = await request.delete("/examples/1").send();

        expect(response.status).toBe(204);
    });

    it("Fails because example does not exist", async () => {
        const response = await request.delete("/examples/99").send();

        expect(response.status).toBe(404);
    });
});
