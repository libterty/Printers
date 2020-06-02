export { Printer } from './instances';
import { Printer } from './instances';

// Example
function main() {
    Printer.Log('Check Log', new Error(), 'info');
}

main();
