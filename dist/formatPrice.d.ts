export type PriceOptions = {
    currencyUnit?: string;
    locale?: string;
};
/**
 * 숫자를 금액 표기법으로 변환합니다.
 * @param value 변환할 숫자
 * @param options 통화 단위 및 로케일 설정
 */
export declare function formatPrice(value: number, options?: PriceOptions): string;
