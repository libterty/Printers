import { Mongoose } from 'mongoose';
import { Printer } from '.';
import { IMongoRequest } from '../interfaces/mongo.interface';
import { MongoLog } from '../models';

class MongoServe {
    constructor() {
        this.Initization();
    }

    /**
     * Init Mongo
     * @param {string | null} baseUrl
     * @param {string | null} dbName
     * @returns {Promise<void>}
     */
    public Initization(): Promise<void>;
    public Initization(baseUrl: string, dbName: string): Promise<void>;
    public Initization(baseUrl?: string, dbName?: string): Promise<void> {
        baseUrl = baseUrl || 'mongodb://127.0.0.1/';
        dbName = dbName || 'logs';

        let url: string = `${baseUrl}${dbName}`;
        return new Mongoose()
            .connect(url, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            })
            .then(() => Printer.Log('Mongo Connect', new Error(), 'success'))
            .catch((err) => Printer.Log(`Mongo Fail: ${err.message}`, new Error(), 'error'));
    }

    /**
     * Mongo Write Data
     * @param {string} message
     * @param {Error} error
     * @param {string} mode
     */
    public async MongoWrite(message: string, error: Error, mode: 'message' | 'warning' | 'info' | 'error' | 'success'): Promise<void> {
        try {
            let title: string = 'Message';

            switch (mode) {
                case 'warning':
                    title = 'Warning';
                    break;
                case 'info':
                    title = '   Info';
                    break;
                case 'error':
                    title = '  Error';
                    break;
                case 'success':
                    title = 'Success';
                    break;
                default:
                    break;
            }

            let path: string = JSON.stringify(error.stack);
            let paths = path.match(/at .*?\(.*?\)\\n/g);
            path = paths && paths.length > 0 ? paths[0].substring(paths[0].lastIndexOf('workspace'), paths[0].lastIndexOf(')')) : '';

            await new MongoLog({
                title,
                message,
                path,
            }).save();
        } catch (error) {
            throw error;
        }
    }
}

export default new MongoServe();
