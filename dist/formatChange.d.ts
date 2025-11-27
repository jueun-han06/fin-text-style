export type ChangeDirection = "up" | "down" | "flat";
export type ChangeLevel = "small" | "moderate" | "big";
export type ChangeSummary = {
    diff: number;
    diffLabel: string;
    rate: number;
    rateLabel: string;
    direction: ChangeDirection;
    level: ChangeLevel;
};
export type ChangeOptions = {
    thresholds?: {
        small: number;
        big: number;
    };
    currencySymbol?: string;
};
export declare function analyzeChange(current: number, previous: number, options?: ChangeOptions): ChangeSummary;
