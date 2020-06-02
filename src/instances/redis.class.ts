import * as Redis from 'redis';
import { nanoid } from 'nanoid';
import { Printer } from '..';

export class RedisServe {
    private _client: Redis.RedisClient;
    private _url: string = '';

    constructor(host?: string, port?: string) {
        host = host || '127.0.0.1';
        port = port || '6379';
        this._url = `redis://${host}:${port}`;
    }

    public async Initization(): Promise<void> {
        try {
            this._client = await Redis.createClient(this._url);

            this._client.on('error', (error) => {
                Printer.Log(`Connect Fail: ${error.message}`, new Error(), 'error');
            });
        } catch (error) {
            throw error;
        }
    }

    public async RedisWrite(message: string, error: Error, mode: 'message' | 'warning' | 'info' | 'error' | 'success'): Promise<void> {
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

            let key = `${nanoid(10)}`;

            await this._client.MSET(key, JSON.stringify({ title, message, path }));
        } catch (error) {
            throw error;
        }
    }
}
