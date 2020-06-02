# Log Printer

-   Printer is a npm package which allows you to print log on your terminal and it will also generate an output file under `src/custom/assets/logs`
-   Printter also support cloud storage with nosql binding, such as Mongodb, Dynamo, Cassandra, Redis

# How to Use

## Installation

```shell
npm install log-printers-exec
```

### Using Local File Generator Printer

-   Define the package with ES5++

```typescript
import { Printer } from 'log-printers-exec';
```

-   Define the package with ES5

```javascript
const { Printer } = require('log-printers-exec');
```

-   Call the function
-   Printer Log Output Function support four parameters

```typescript
interface IPrinter {
    message: string;
    error: Error;
    mode: 'message' | 'warning' | 'info' | 'error' | 'success';
    type?: string;
}
```

```typescript
Printer.Log('Hello World!', new Error(), 'message');
```

### Using Redis Storage

-   Define the package with ES5++

```typescript
import { RedisServe } from 'log-printers-exec';
```

-   Define the package with ES5

```javascript
const { RedisServe } = require('log-printers-exec');
```

-   Init a new RedisServe Instance

```javascript
const redisServe = new RedisServe(); // default host with 127.0.0.1 and port 6379
const redisServe = new RedisServe('192.168.1.1', '6379');
```

```javascript
const writeWithRedis = async (message, error, mode) => {
    try {
        await redisServe.Initization();
        await redisServe.RedisWrite(message, new Error(), 'message');
    } catch (error) {
        throw new Error(error);
    }
};
```

### Using MongoDB Storage

-   Define the package with ES5++

```typescript
import { MongoServe } from 'log-printers-exec';
```

-   Define the package with ES5

```javascript
const { MongoServe } = require('log-printers-exec');
```

-   Init a new RedisServe Instance

```javascript
const mongoServe = new MongoServe(); // default host with 127.0.0.1 and dbName logs
const mongoServe = new MongoServe('192.168.1.1', 'newLogs');
```

```javascript
const writeWithRedis = async (message, error, mode) => {
    try {
        await mongoServe.Initization();
        await mongoServe.MongoWrite(message, new Error(), 'message');
    } catch (error) {
        throw new Error(error);
    }
};
```

# LICENCE

MIT
