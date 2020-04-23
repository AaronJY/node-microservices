import mongoose from 'mongoose';

export class ConnectionManager {
    private static connection: mongoose.Connection;

    static async connect(connectionString: string): Promise<mongoose.Connection> {
        this.connection = (await mongoose.connect(connectionString)).connection;
        return this.connection;
    }

    static getConnection(): mongoose.Connection {
        if (!this.connection) {
            throw new Error('Connection not established. Call connect()');
        }

        return this.connection;
    }
}