// formatChange.ts
// 현재 가격과 이전 가격을 비교해서
// 상승/하락/보합 + 등락률 + "소폭/보통/급등" 수준을 계산해주는 함수

export type ChangeDirection = "up" | "down" | "flat";
export type ChangeLevel = "small" | "moderate" | "big";

export type ChangeSummary = {
  diff: number;          // 가격 차이 (현재 - 이전)
  diffLabel: string;     // "+2,300원" 같이 표시용 텍스트
  rate: number;          // 등락률 (퍼센트 숫자)
  rateLabel: string;     // "+2.7%" 같이 표시용 텍스트
  direction: ChangeDirection; // up / down / flat
  level: ChangeLevel;         // small / moderate / big
};

// 기본 임계값(기준선)
// 0~1% : small
// 1~3% : moderate
// 3% 이상 : big
const SMALL_THRESHOLD = 1;
const BIG_THRESHOLD = 3;

export function analyzeChange(current: number, previous: number): ChangeSummary {
  // 이전 가격이 0이면 등락률을 계산할 수 없으므로 "변화 없음"으로 처리
  if (previous === 0) {
    return {
      diff: 0,
      diffLabel: "0원",
      rate: 0,
      rateLabel: "0%",
      direction: "flat",
      level: "small",
    };
  }

  const diff = current - previous; // 가격 차이
  const rate = (diff / previous) * 100; // 퍼센트 등락률

  const direction: ChangeDirection =
    diff > 0 ? "up" : diff < 0 ? "down" : "flat";

  const absRate = Math.abs(rate);

  let level: ChangeLevel;
  if (absRate < SMALL_THRESHOLD) {
    level = "small";
  } else if (absRate < BIG_THRESHOLD) {
    level = "moderate";
  } else {
    level = "big";
  }

  const diffSign = diff > 0 ? "+" : diff < 0 ? "-" : "";
  const rateSign = rate > 0 ? "+" : rate < 0 ? "-" : "";

  const diffLabel = `${diffSign}${Math.abs(diff).toLocaleString("ko-KR")}원`;
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
