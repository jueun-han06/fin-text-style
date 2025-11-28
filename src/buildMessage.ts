// buildMessage.ts
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

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type MessageOptions = {
  name?: string;
  toneConfig?: DeepPartial<ToneConfig>;
};

function pickTone(change: ChangeSummary, tone: ToneConfig): string {
  const bucket = tone[change.level];
  if (!bucket) return "";

  if (change.direction === "up") return bucket.up;
  if (change.direction === "down") return bucket.down;
  return bucket.flat;
}

export function buildChangeMessage(
  current: number,
  previous: number,
  options: MessageOptions = {},
): string {
  const { name } = options;

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