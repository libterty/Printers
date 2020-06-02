# Log Printer

-   Printer is a npm package which allows you to print log on your terminal and it will also generate an output file under `src/custom/assets/logs`
-   Printter also support cloud storage with nosql binding, such as Mongodb, Dynamo, Cassandra, Redis

# How to Use

## Installation

```shell
npm install log-printers
```

### Using Local File Generator Printer

-   Define the package

```typescript
import { Printer } from 'log-printers';
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

# LICENCE

MIT
