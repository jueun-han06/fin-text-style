// formatChange.ts
// 현재 가격과 이전 가격을 비교해서
// 상승/하락/보합 + 등락률 + "소폭/보통/급등" 수준을 계산해주는 함수

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

export type AnalyzeChangeOptions = {
  thresholds?: {
    small: number;
    big: number;
  };
  currencySymbol?: string;
};

// 기본 설정값
const DEFAULT_OPTIONS = {
  thresholds: { small: 1, big: 3 },
  currencySymbol: "원",
};

function safeRate(value: number): number {
  return Math.round(value * 100) / 100;
}

export function analyzeChange(
  current: number,
  previous: number,
  options: AnalyzeChangeOptions = {}
): ChangeSummary {
  const config = { ...DEFAULT_OPTIONS, ...options };
  const { small, big } = config.thresholds || DEFAULT_OPTIONS.thresholds;
  const symbol = config.currencySymbol || "원";

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
  const rate = safeRate(rawRate);

  const direction: ChangeDirection = diff > 0 ? "up" : diff < 0 ? "down" : "flat";
  const absRate = Math.abs(rate);

  let level: ChangeLevel;
  if (absRate < small) {
    level = "small";
  } else if (absRate < big) {
    level = "moderate";
  } else {
    level = "big";
  }

  const diffSign = diff > 0 ? "+" : diff < 0 ? "-" : "";
  const rateSign = rate > 0 ? "+" : rate < 0 ? "-" : "";

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