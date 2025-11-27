import { ChangeSummary } from "./formatChange";
export type SemanticColor = "positive" | "negative" | "neutral";
export type ColorToken = "priceUpSoft" | "priceUpStrong" | "priceDownSoft" | "priceDownStrong" | "priceNeutral";
export type IconToken = "arrowUp" | "arrowDown" | "minus";
export type StyleRecommendation = {
    semanticColor: SemanticColor;
    colorToken: ColorToken;
    icon: IconToken;
    emphasize: boolean;
};
/**
 * 등락 요약 정보를 기반으로 UI 스타일을 추천합니다.
 * - direction: 상승 / 하락 / 보합
 * - level: small / moderate / big 에 따라 강도 조절
 */
export declare function recommendStyle(change: ChangeSummary): StyleRecommendation;
