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
  small: ToneWords;
  moderate: ToneWords;
  big: ToneWords;
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

// [핵심 기술] 사용자가 설정의 일부만 넘겨도 되도록 만드는 고급 타입
// 예를 들어 'big'일 때의 문구만 바꾸고 싶으면, small이나 moderate는 안 적어도 되게 해줍니다.
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type BuildMessageOptions = {
  name?: string;
  toneConfig?: DeepPartial<ToneConfig>; // 일부만 수정 가능하게 설정
};

function pickTone(change: ChangeSummary, tone: ToneConfig): string {
  const bucket = tone[change.level];
  // 방어 로직: 혹시라도 level에 맞는 설정이 없을 경우를 대비
  if (!bucket) return "";

  if (change.direction === "up") return bucket.up;
  if (change.direction === "down") return bucket.down;
  return bucket.flat;
}

export function buildChangeMessage(
  current: number,
  previous: number,
  options: BuildMessageOptions = {},
): string {
  const { name } = options;

  // [설정 병합] 사용자가 입력한 설정(options.toneConfig)과 기본 설정(defaultToneConfig)을 합칩니다.
  // 사용자가 일부만 적었어도 나머지는 기본값이 채워져서 에러가 안 납니다.
  const toneConfig: ToneConfig = {
    small: { ...defaultToneConfig.small, ...options.toneConfig?.small },
    moderate: { ...defaultToneConfig.moderate, ...options.toneConfig?.moderate },
    big: { ...defaultToneConfig.big, ...options.toneConfig?.big },
  };

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