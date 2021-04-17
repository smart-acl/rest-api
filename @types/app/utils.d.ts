declare module 'utils' {
    export interface Indexed<T = any> {
        [x: string]: T;
    }

    export type Assign<T, K> = Pick<T, Exclude<keyof T, keyof K>> & K;

    export type Nullable<T = unknown> = null | T;
    export type Empty<T = unknown> = undefined | T;
    export type Nil<T = unknown> = Empty<T> | Nullable<T>;
}
