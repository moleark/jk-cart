import { Res } from '../res';

export interface RegisterRes {
    a: string;
}

export const registerRes: Res<RegisterRes> = {
    _: {
        a: 'd',
    }
}
