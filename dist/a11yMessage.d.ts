export type A11yOptions = {
    name?: string;
};
/**
 * 화면 읽기 도구에서 읽기 좋은 형태의 문장을 생성합니다.
 * 예) "삼성전자, 현재가 88,300원, 전일 대비 2.67퍼센트 상승했습니다."
 */
export declare function buildA11yChangeLabel(current: number, previous: number, options?: A11yOptions): string;
