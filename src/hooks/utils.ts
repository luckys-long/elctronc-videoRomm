// import bMd5 from 'blueimp-md5';
import mitt from 'mitt';
import { cloneDeep } from 'lodash';

// export const useMd5 = (plaintext: string): string => bMd5(`${plaintext}SEED`);
const emitter = mitt();
export const useMitt = () => emitter;
export const useDeepClone = () => cloneDeep;
export const isNotExist = (val: unknown): boolean => val === null || typeof val === 'undefined';
