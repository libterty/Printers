import { EFontColor, EBackColor } from 'src/enums';

class Printer {
    /**
     * WorkSpace Path FileName
     */
    private _fileRoot = 'src';

    constructor(fileRoot?: string) {
        this._fileRoot = fileRoot;
    }

    Log(message: any, error: Error, mode: 'message' | 'warning' | 'info' | 'error' | 'success'): void;
    Log(message: any, error: Error, mode: 'message' | 'warning' | 'info' | 'error' | 'success', type: string): void;
    Log(message: any, error: Error, mode: 'message' | 'warning' | 'info' | 'error' | 'success', type?: string): void {
        let font: EFontColor = EFontColor.white;
        let back: EBackColor = EBackColor.white;
        let title: string = 'Message';
        // const date: string = DateTime

        switch (mode) {
            case 'warning':
                font = EFontColor.yellow;
                back = EBackColor.yellow;
                title = 'Warning';
                break;
            case 'info':
                font = EFontColor.blue;
                back = EBackColor.blue;
                title = '   Info';
                break;
            case 'error':
                font = EFontColor.red;
                back = EBackColor.red;
                title = '  Error';
                break;
            case 'success':
                font = EFontColor.green;
                back = EBackColor.green;
                title = 'Success';
                break;
            default:
                break;
        }

        let path: string = JSON.stringify(error.stack);
        let paths = path.match(/at .*?\(.*?\)\\n/g);

        path = paths && paths.length > 0 ? paths[0].substring(paths[0].lastIndexOf(this._fileRoot), paths[0].lastIndexOf(')')) : '';

        message = message instanceof Error ? message.message : message;
        message = typeof message === 'object' ? JSON.stringify(message) : message;

        // Message Fn
    }
}
