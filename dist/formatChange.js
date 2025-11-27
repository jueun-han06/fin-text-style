"use strict";
// formatChange.ts
// 현재 가격과 이전 가격을 비교해서
// 상승/하락/보합 + 등락률 + "소폭/보통/급등" 수준을 계산해주는 함수
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeChange = analyzeChange;
// 기본 설정값 (사용자가 아무것도 안 넣었을 때 씀)
const DEFAULT_OPTIONS = {
    thresholds: { small: 1, big: 3 },
    currencySymbol: "원",
};
/**
 * 소수점 계산 오류(부동소수점 문제)를 방지하기 위한 안전한 반올림 함수
 * 예: 0.1 + 0.2 = 0.3000000004 같은 문제를 막아줍니다.
 */
function safeRate(value) {
    return Math.round(value * 100) / 100;
}
function analyzeChange(current, previous, options = {}) {
    // 사용자가 준 옵션과 기본값을 합침
    const config = { ...DEFAULT_OPTIONS, ...options };
    const { small, big } = config.thresholds || DEFAULT_OPTIONS.thresholds;
    const symbol = config.currencySymbol || "원";
    // 방어 로직: 이전 가격이 0원이면 나눗셈을 할 수 없으므로 0으로 처리
    if (previous === 0) {
        return {
            diff: 0,
            diffLabel: `0${symbol}`,
            rate: 0,
            rateLabel: "0.00%",
            direction: "flat",
            level: "small",
        };
    }
    const diff = current - previous;
    const rawRate = (diff / previous) * 100;
    const rate = safeRate(rawRate); // 안전하게 반올림 적용
    const direction = diff > 0 ? "up" : diff < 0 ? "down" : "flat";
    const absRate = Math.abs(rate);
    // 변동 폭(Level) 계산: 사용자가 설정한 기준(small, big)을 따름
    let level;
    if (absRate < small) {
        level = "small";
    }
    else if (absRate < big) {
        level = "moderate";
    }
    else {
        level = "big";
    }
    const diffSign = diff > 0 ? "+" : diff < 0 ? "-" : "";
    const rateSign = rate > 0 ? "+" : rate < 0 ? "-" : "";
    // 1,000 단위 콤마 찍기 + 설정된 화폐 단위 붙이기
    const diffLabel = `${diffSign}${Math.abs(diff).toLocaleString("ko-KR")}${symbol}`;
    const rateLabel = `${rateSign}${absRate.toFixed(2)}%`;
    return {
        diff,
        diffLabel,
        rate,
        rateLabel,
        direction,
        level,
    };
}
