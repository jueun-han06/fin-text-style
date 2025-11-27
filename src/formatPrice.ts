// formatPrice.ts
// 가격을 보기 좋게 포맷팅하는 함수
// ex) 1532000 → "1,532,000원"

export type PriceOptions = {
  currencyUnit?: string; // "원", "$", "USD" 등 선택 가능
  locale?: string;       // "ko-KR", "en-US" 등 국가 선택 가능
};

/**
 * 숫자를 금액 표기법으로 변환합니다.
 * @param value 변환할 숫자
 * @param options 통화 단위 및 로케일 설정
 */
export function formatPrice(
  value: number, 
  options: PriceOptions = {}
): string {
  // 옵션이 없으면 기본값으로 "원", "한국" 설정 (Default Parameter)
  const { currencyUnit = "원", locale = "ko-KR" } = options;

  if (isNaN(value)) {
    return `0${currencyUnit}`;
  }

  // toLocaleString을 써서 천 단위 콤마를 자동으로 찍어줍니다.
  const formatted = value.toLocaleString(locale);
  
  return `${formatted}${currencyUnit}`;
}
