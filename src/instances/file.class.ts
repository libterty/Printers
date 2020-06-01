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

    public WriteFile(fileName: string, data: any): void {
        try {
            this.CreateFolder(this.GetPath(fileName));
            let realPath: string = this.RealPath(fileName);

            Fs.writeFileSync(realPath, data);
        } catch (error) {
            throw error;
        }
    }
}

export default new FileServe();
