import * as Moment from 'moment';

class DateTime {
    /**
     * Init Global
     */
    private _format: string = '';

    constructor() {
        this._format = 'YYYY/MM/DD HH:mm:ss';
    }

    /**
     * Convert date to format string use moment
     * @param {Date} date
     */
    public ToString(date: Date, format?: string): string {
        try {
            if (format) this._format = format;

            return Moment(date).format(this._format);
        } catch (error) {
            throw error;
        }
    }
}

export default new DateTime();
