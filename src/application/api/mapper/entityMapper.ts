import { mapFromSchema, PlainObject, Schema } from "infrastructure/mapper/objectMapper";

export { PlainObject, Schema };

export const mapEntity = (entity: PlainObject | PlainObject[], schema?: Schema): PlainObject | PlainObject[] => {
    if (Array.isArray(entity)) {
        return entity.map((e) => mapEntity(e, schema));
    }

    return schema ? mapFromSchema(entity, schema) : removeMongoDbId({ ...entity });
};

const removeMongoDbId = (entity: PlainObject): PlainObject => {
    if (entity._id) {
        delete entity._id;
    }

    return entity;
};
