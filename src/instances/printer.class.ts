import { EFontColor, EBackColor } from 'src/enums';
import { IFormat } from 'src/interfaces';
import { DateTime } from './index';

class Printer {
    /**
     * WorkSpace Path FileName
     */
    private _fileRoot = 'src';
    private _reset = '\x1b[0m';

    constructor(fileRoot?: string) {
        this._fileRoot = fileRoot;
    }

    public Message(...messages: IFormat[]): void {
        let str: string = '';

        for (let message of messages) {
            str += this._reset;
            str += message.background === null || message.background === undefined ? '' : message.background;
            str += message.color === null || message.color === undefined ? '' : message.color;
            str += message.message;
            str += this._reset;
            str += ' ';
        }

        console.log(str);
    }

    public Log(message: any, error: Error, mode: 'message' | 'warning' | 'info' | 'error' | 'success'): void;
    public Log(message: any, error: Error, mode: 'message' | 'warning' | 'info' | 'error' | 'success', type: string): void;
    public Log(message: any, error: Error, mode: 'message' | 'warning' | 'info' | 'error' | 'success', type?: string): void {
        let font: EFontColor = EFontColor.white;
        let back: EBackColor = EBackColor.white;
        let title: string = 'Message';
        const date: string = DateTime.ToString(new Date());

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
        this.Message(
            {
                message: '  ',
                background: back,
            },
            {
                message: Date,
                color: font,
            },
            {
                message: title,
                color: font,
            },
            {
                message: '--->',
                color: font,
            },
            {
                message,
            },
            {
                message: `(${path})`,
            },
        );

        // Log Write
    }
}
