import { atom } from 'recoil';

export const tokenAtom = atom({
    key: 'jwt',
    default: null
});