import Connection from "./Connection";

export default abstract class BaseLogic {
    protected connection: Connection;

    constructor(connection: Connection) {
        this.connection = connection;
    }

    public abstract getRelatedFunc(page: any): Promise<void>;
}