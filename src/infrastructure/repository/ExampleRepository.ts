import { inject } from "inversify";
import { TYPES } from "@types";
import { MongoRepository } from "@mongodb/MongoRepository";
import { IConnectionManager } from "@mongodb/ConnectionManager";
import { IExampleRepository, SortDirection } from "@repository/ExampleRepository";
import { provideSingleton } from "@providers";
import { Example } from "@entity/Example";

export const collectionName = "example";

@provideSingleton(TYPES.ExampleRepository)
export class ExampleRepository extends MongoRepository implements IExampleRepository {
    constructor(@inject(TYPES.ConnectionManager) connectionManager: IConnectionManager) {
        super();

        this.collection = connectionManager.getCollection(collectionName);
    }

    public async findOneById(id: number): Promise<Example | null> {
        return await this.findOneBy<Example>({ id });
    }

    public async findOneByValue(value: string): Promise<Example | null> {
        return await this.findOneBy<Example>({ value });
    }

    public async findPaginated(
        offset: number,
        limit: number,
        sort: string,
        direction: SortDirection,
        value?: string
    ): Promise<Example[]> {
        return await this.findBy(value ? { value } : {}, { [sort]: direction }, offset, limit);
    }
}
