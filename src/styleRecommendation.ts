// src/styleRecommendation.ts
// 등락 정보(direction, level)를 기반으로
// UI에서 사용할 색상, 아이콘, 강조 여부를 추천해주는 모듈

import type { ChangeDirection, ChangeLevel } from "./formatChange";

export type StyleRecommendationInput = {
  direction: ChangeDirection;
  level: ChangeLevel;
};

export type StyleRecommendation = {
  semanticColor: "positive" | "negative" | "neutral";
  colorToken: string;
  icon: "arrowUp" | "arrowDown" | "minus";
  emphasize: boolean;
};

/**
 * 등락 방향/강도에 따라 UI 스타일 정보를 추천해 주는 함수
 * - semanticColor: 토스나 증권 UI에서 쓰는 의미 기반 컬러 토큰
 * - colorToken: 디자인 시스템에서 쓸 수 있는 좀 더 구체적인 토큰 이름
 * - icon: 상승/하락/보합 아이콘
 * - emphasize: 급등/급락처럼 강조가 필요한지 여부
 */
export function getStyleRecommendation(
  input: StyleRecommendationInput
): StyleRecommendation {
  const { direction, level } = input;

  if (direction === "up") {
    return {
      semanticColor: "positive",
      colorToken: level === "big" ? "priceUpStrong" : "priceUp",
      icon: "arrowUp",
      emphasize: level === "big",
    };
  }

  if (direction === "down") {
    return {
      semanticColor: "negative",
      colorToken: level === "big" ? "priceDownStrong" : "priceDown",
      icon: "arrowDown",
      emphasize: level === "big",
    };
  }

  // direction === "flat"
  return {
    semanticColor: "neutral",
    colorToken: "priceNeutral",
    icon: "minus",
    emphasize: false,
  };
}