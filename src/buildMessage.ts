// buildMessage.ts
// 종목 이름, 현재가, 이전가를 받아서
// "삼성전자, 전일 대비 2.7% 상승(소폭 상승입니다)" 같은 문장을 만들어 주는 함수

import { formatPrice } from "./formatPrice";
import { analyzeChange, ChangeSummary } from "./formatChange";

export type ToneWords = {
  up: string;
  down: string;
  flat: string;
};

export type ToneConfig = {
  small: ToneWords;    // 소폭 변동일 때
  moderate: ToneWords; // 보통 변동
  big: ToneWords;      // 급등/급락
};

const defaultToneConfig: ToneConfig = {
  small: {
    up: "소폭 상승입니다.",
    down: "소폭 하락입니다.",
    flat: "거의 변동이 없습니다.",
  },
  moderate: {
    up: "상승 흐름입니다.",
    down: "하락 흐름입니다.",
    flat: "안정적인 흐름입니다.",
  },
  big: {
    up: "급등한 상태입니다.",
    down: "급락한 상태입니다.",
    flat: "큰 변동 없이 유지되고 있습니다.",
  },
};

export type BuildMessageOptions = {
  name?: string;              // 종목 이름 (예: "삼성전자")
  toneConfig?: ToneConfig;    // 톤 커스터마이징
};

function pickTone(change: ChangeSummary, tone: ToneConfig): string {
  const bucket = tone[change.level]; // small / moderate / big 중 하나

  if (change.direction === "up") return bucket.up;
  if (change.direction === "down") return bucket.down;
  return bucket.flat;
}

export function buildChangeMessage(
  current: number,
  previous: number,
  options: BuildMessageOptions = {},
): string {
  const { name, toneConfig = defaultToneConfig } = options;

  const baseLabel = name ? `${name}, ` : "";
  const currentLabel = `현재가 ${formatPrice(current)}`;
  const change = analyzeChange(current, previous);
  const directionLabel =
    change.direction === "up"
      ? "상승"
      : change.direction === "down"
      ? "하락"
      : "보합";

  if (change.direction === "flat") {
    return `${baseLabel}${currentLabel}, 전일 대비 변동이 없습니다.`;
  }

  const toneSentence = pickTone(change, toneConfig);

  return (
    `${baseLabel}${currentLabel}, ` +
    `전일 대비 ${change.diffLabel} (${change.rateLabel}) ${directionLabel}, ` +
    `${toneSentence}`
  );
}
