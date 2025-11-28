type PriceOptions = {
    currencyUnit?: string;
    locale?: string;
};
/**
 * 숫자를 금액 표기법으로 변환합니다.
 * @param value 변환할 숫자
 * @param options 통화 단위 및 로케일 설정
 */
declare function formatPrice(value: number, options?: PriceOptions): string;

type ChangeDirection = "up" | "down" | "flat";
type ChangeLevel = "small" | "moderate" | "big";
type ChangeSummary = {
    diff: number;
    diffLabel: string;
    rate: number;
    rateLabel: string;
    direction: ChangeDirection;
    level: ChangeLevel;
};
type AnalyzeChangeOptions = {
    thresholds?: {
        small: number;
        big: number;
    };
    currencySymbol?: string;
};
declare function analyzeChange(current: number, previous: number, options?: AnalyzeChangeOptions): ChangeSummary;

type ToneWords = {
    up: string;
    down: string;
    flat: string;
};
type ToneConfig = {
    small: ToneWords;
    moderate: ToneWords;
    big: ToneWords;
};
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
type MessageOptions = {
    name?: string;
    toneConfig?: DeepPartial<ToneConfig>;
};
declare function buildChangeMessage(current: number, previous: number, options?: MessageOptions): string;

type StyleRecommendationInput = {
    direction: ChangeDirection;
    level: ChangeLevel;
};
type StyleRecommendation = {
    semanticColor: "positive" | "negative" | "neutral";
    colorToken: string;
    icon: "arrowUp" | "arrowDown" | "minus";
    emphasize: boolean;
};
/**
 * 등락 방향/강도에 따라 UI 스타일 정보를 추천해 주는 함수
 * - semanticColor: 토스나 증권 UI에서 쓰는 의미 기반 컬러 토큰
 * - colorToken: 디자인 시스템에서 쓸 수 있는 좀 더 구체적인 토큰 이름
 * - icon: 상승/하락/보합 아이콘
 * - emphasize: 급등/급락처럼 강조가 필요한지 여부
 */
declare function getStyleRecommendation(input: StyleRecommendationInput): StyleRecommendation;

type A11yOptions = {
    name?: string;
};
/**
 * 화면 읽기 도구에서 읽기 좋은 형태의 문장을 생성합니다.
 * 예) "삼성전자, 현재가 88,300원, 전일 대비 2.67퍼센트 상승했습니다."
 */
declare function buildA11yChangeLabel(current: number, previous: number, options?: A11yOptions): string;

/**
 * React 환경에서 가격 변동 정보를 효율적으로 계산하고 관리하는 Hook
 * 입력값이 변경될 때만 재계산(Memoization)을 수행
 */
declare function useFinancialChange(currentPrice: number, previousPrice: number, options?: AnalyzeChangeOptions & MessageOptions): {
    summary: ChangeSummary;
    message: string;
    style: StyleRecommendation;
    isUp: boolean;
    isDown: boolean;
    isFlat: boolean;
};

export { type A11yOptions, type AnalyzeChangeOptions, type ChangeDirection, type ChangeLevel, type ChangeSummary, type MessageOptions, type PriceOptions, type StyleRecommendation, type StyleRecommendationInput, type ToneConfig, type ToneWords, analyzeChange, buildA11yChangeLabel, buildChangeMessage, formatPrice, getStyleRecommendation, useFinancialChange };
