import * as Redis from 'ioredis';

class RedisServe {
    private _redis;
    private _host: string = '';
    private _port: number = 0;

    constructor(host?: string, port?: number) {
        this._host = host || '127.0.0.1';
        this._port = port || 6379;
    }

    publicgit  Initization(): void;
    publicgit  Initization(host: string, port: number): void;
    publicgit  Initization(host?: string, port?: number): void {
        this._host = host || this._host;
        this._port = port || this._port;

        this._redis = new Redis(this._port, this._host);
    }
}
