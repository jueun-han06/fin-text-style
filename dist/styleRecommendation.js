"use strict";
// styleRecommendation.ts
// 등락 정보(ChangeSummary)를 받아서
// UI에서 사용할 색상 토큰 / 아이콘 / 강조 여부를 추천해주는 모듈
Object.defineProperty(exports, "__esModule", { value: true });
exports.recommendStyle = recommendStyle;
/**
 * 등락 요약 정보를 기반으로 UI 스타일을 추천합니다.
 * - direction: 상승 / 하락 / 보합
 * - level: small / moderate / big 에 따라 강도 조절
 */
function recommendStyle(change) {
    let semanticColor;
    let colorToken;
    let icon;
    let emphasize = false;
    if (change.direction === "up") {
        semanticColor = "positive";
        icon = "arrowUp";
        if (change.level === "big") {
            colorToken = "priceUpStrong";
            emphasize = true;
        }
        else if (change.level === "moderate") {
            colorToken = "priceUpStrong";
        }
        else {
            colorToken = "priceUpSoft";
        }
    }
    else if (change.direction === "down") {
        semanticColor = "negative";
        icon = "arrowDown";
        if (change.level === "big") {
            colorToken = "priceDownStrong";
            emphasize = true;
        }
        else if (change.level === "moderate") {
            colorToken = "priceDownStrong";
        }
        else {
            colorToken = "priceDownSoft";
        }
    }
    else {
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
