export type ToneWords = {
    up: string;
    down: string;
    flat: string;
};
export type ToneConfig = {
    small: ToneWords;
    moderate: ToneWords;
    big: ToneWords;
};
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
export type BuildMessageOptions = {
    name?: string;
    toneConfig?: DeepPartial<ToneConfig>;
};
export declare function buildChangeMessage(current: number, previous: number, options?: BuildMessageOptions): string;
export {};
