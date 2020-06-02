import { DateTime, FileServe } from '.';

class Log {
    private _logPath: string = './src/custom/assets/logs';
    private _logFile: string = '{{type}}-{{date}}-{{index}}.log';
    private _limitSize: number = 10000000;

    public Write(message: string): void;
    public Write(message: string, type: string): void;
    public Write(message: string, type?: string): void {
        try {
            type = type || 'log';

            if (!message) return null;

            let now: Date = new Date();
            let date: string = DateTime.ToString(now, 'YYYY-MM-DD');

            let fileName: string = `${this._logPath}/${this._logFile.replace(/{{type}}/g, type).replace(/{{date}}/g, date)}`;

            let log: string = `${message}\r\n`;

            for (let i = 0; true; ++i) {
                let _fileName: string = fileName.replace(/{{index}}/g, i.toString());
                if (FileServe.GetFileAlive(_fileName) && FileServe.GetFileStatus(_fileName).size >= this._limitSize) {
                    continue;
                }
                fileName = _fileName;
                break;
            }

            FileServe.AppendFile(fileName, log);
        } catch (error) {
            throw error;
        }
    }
}

export default new Log();
