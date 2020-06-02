import * as Fs from 'fs';
import * as Path from 'path';
import { execFile } from 'child_process';
import * as Enum from '../enums';

class FileServe {
    /**
     * Get File Path
     * @param {string} file
     */
    public RealPath(file: string): string {
        let realpath: string = Path.resolve(file);
        return realpath;
    }

    /**
     * Get Path
     * @param {string} filename
     */
    public GetPath(filename: string): string {
        filename = filename.replace(/\/|\\/g, '/');
        let path: string = filename.substr(0, filename.lastIndexOf('/'));
        return this.RealPath(path);
    }

    /**
     * Create folder
     * @param {string} path
     */
    public CreateFolder(path: string): void {
        try {
            let realPath: string = this.RealPath(path);
            let realPaths: string[] = realPath.split(/\/|\\/g);

            realPaths.reduce((prevVal, curVal, curIndex, arr) => {
                let sum: string = `${prevVal}/${curVal}`;
                if (!Fs.existsSync(sum)) {
                    Fs.mkdirSync(sum);
                }

                return sum;
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Write File
     * @param {string} fileName
     * @param {any} data
     */
    public WriteFile(fileName: string, data: any): void {
        try {
            this.CreateFolder(this.GetPath(fileName));
            let realPath: string = this.RealPath(fileName);

            Fs.writeFileSync(realPath, data);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Append File
     * @param {string} fileName
     * @param {any} data
     */
    public AppendFile(fileName: string, data: any): void {
        try {
            this.CreateFolder(this.GetPath(fileName));

            let realPath: string = this.RealPath(fileName);

            Fs.appendFileSync(realPath, data);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Read File
     * @param {string} fileName
     * @returns {Buffer}
     */
    public ReadFile(fileName: string): Buffer {
        try {
            this.CreateFolder(this.GetPath(fileName));

            let realPath: string = this.RealPath(fileName);

            let buffer: Buffer = Fs.readFileSync(realPath);

            return buffer;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Get File Status
     * @param {string} fileName
     * @returns {Fs.Stats}
     */
    public GetFileStatus(fileName: string): Fs.Stats {
        try {
            this.CreateFolder(this.GetPath(fileName));

            let realPath: string = this.RealPath(fileName);

            let status = Fs.statSync(realPath);

            return status;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Check if File Alive
     * @param {string} fileName
     * @returns {boolean}
     */
    public GetFileAlive(fileName: string): boolean {
        try {
            this.CreateFolder(this.GetPath(fileName));
            let realPath: string = this.RealPath(fileName);

            Fs.accessSync(fileName);

            return true;
        } catch (error) {
            return false;
        }
    }
}

export default new FileServe();
