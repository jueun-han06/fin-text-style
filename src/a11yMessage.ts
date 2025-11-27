// a11yMessage.ts
// 스크린 리더용 접근성 텍스트(A11Y label)를 만들어주는 모듈

import { formatPrice } from "./formatPrice";
import { analyzeChange } from "./formatChange";

export type A11yOptions = {
  name?: string; // 종목 이름 (예: "삼성전자")
};

/**
 * 화면 읽기 도구에서 읽기 좋은 형태의 문장을 생성합니다.
 * 예) "삼성전자, 현재가 88,300원, 전일 대비 2.67퍼센트 상승했습니다."
 */
export function buildA11yChangeLabel(
  current: number,
  previous: number,
  options: A11yOptions = {},
): string {
  const { name } = options;

  const baseLabel = name ? `${name}, ` : "";
  const currentLabel = `현재가 ${formatPrice(current)}`;

  const change = analyzeChange(current, previous);

  // 이전 가격이 0이거나, 변동이 거의 없는 경우
  if (change.direction === "flat") {
    return `${baseLabel}${currentLabel}, 전일 대비 변동이 거의 없습니다.`;
  }

  const absRate = Math.abs(change.rate);
  const rateLabel = `${absRate.toFixed(2)}퍼센트`;

  const directionLabel =
    change.direction === "up"
      ? "상승했습니다."
      : "하락했습니다.";

  return `${baseLabel}${currentLabel}, 전일 대비 ${rateLabel} ${directionLabel}`;
}
