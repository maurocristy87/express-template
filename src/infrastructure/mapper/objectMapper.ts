// eslint-disable-next-line
export type PlainObject = { [key: string]: any };

export type Schema = {
    [key: string]: "string" | "number" | "boolean" | boolean | Schema | Schema[];
};

/**
 * Maps an object to a new object based on a schema.
 * @param object the object to map
 * @param schema the schema to be based on
 * @returns the mapped new object
 */
export const mapFromSchema = (object: PlainObject, schema: Schema): PlainObject | PlainObject[] => {
    const mapped = { ...object };

    Object.keys(object).forEach((key) => {
        if (!schema[key]) {
            delete mapped[key];
        } else {
            if (Array.isArray(object[key]) && typeof object[key][0] === "object" && typeof schema[key] === "object") {
                mapped[key] = object[key].map((o: PlainObject) => mapFromSchema(o, schema[key] as PlainObject));
            } else if (typeof schema[key] === "object" && typeof object[key] === "object") {
                mapped[key] = mapFromSchema(object[key] as PlainObject, schema[key] as PlainObject);
            } else if (schema[key] === "boolean") {
                mapped[key] = Boolean(object[key]);
            } else if (schema[key] === "number") {
                mapped[key] = Number(object[key]);
            } else if (schema[key] === "string") {
                mapped[key] = String(object[key]);
            }
        }
    });

    return mapped;
};
