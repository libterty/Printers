import { EFontColor, EBackColor } from '../enums/index';

export interface IFormat {
    message: any;
    color?: EFontColor;
    background?: EBackColor;
}
