// styleRecommendation.ts
// 등락 정보(ChangeSummary)를 받아서
// UI에서 사용할 색상 토큰 / 아이콘 / 강조 여부를 추천해주는 모듈

import { ChangeSummary } from "./formatChange";

export type SemanticColor = "positive" | "negative" | "neutral";

export type ColorToken =
  | "priceUpSoft"
  | "priceUpStrong"
  | "priceDownSoft"
  | "priceDownStrong"
  | "priceNeutral";

export type IconToken = "arrowUp" | "arrowDown" | "minus";

export type StyleRecommendation = {
  semanticColor: SemanticColor; // 의미론적 색상 (양/음/중립)
  colorToken: ColorToken;       // 디자인 시스템에서 바로 쓸 수 있는 토큰 이름
  icon: IconToken;              // 사용할 아이콘 종류
  emphasize: boolean;           // 급등/급락 등 강조 표시 여부
};

/**
 * 등락 요약 정보를 기반으로 UI 스타일을 추천합니다.
 * - direction: 상승 / 하락 / 보합
 * - level: small / moderate / big 에 따라 강도 조절
 */
export function recommendStyle(change: ChangeSummary): StyleRecommendation {
  let semanticColor: SemanticColor;
  let colorToken: ColorToken;
  let icon: IconToken;
  let emphasize = false;

  if (change.direction === "up") {
    semanticColor = "positive";
    icon = "arrowUp";

    if (change.level === "big") {
      colorToken = "priceUpStrong";
      emphasize = true;
    } else if (change.level === "moderate") {
      colorToken = "priceUpStrong";
    } else {
      colorToken = "priceUpSoft";
    }
  } else if (change.direction === "down") {
    semanticColor = "negative";
    icon = "arrowDown";

    if (change.level === "big") {
      colorToken = "priceDownStrong";
      emphasize = true;
    } else if (change.level === "moderate") {
      colorToken = "priceDownStrong";
    } else {
      colorToken = "priceDownSoft";
    }
  } else {
    // 보합 또는 변동 거의 없음
    semanticColor = "neutral";
    colorToken = "priceNeutral";
    icon = "minus";
  }

  return {
    semanticColor,
    colorToken,
    icon,
    emphasize,
  };
}