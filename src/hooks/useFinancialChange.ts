import { useMemo } from 'react';
import { analyzeChange, AnalyzeChangeOptions } from '../formatChange';
import { buildChangeMessage, MessageOptions } from '../buildMessage';
import { getStyleRecommendation } from '../styleRecommendation';

/**
 * React 환경에서 가격 변동 정보를 효율적으로 계산하고 관리하는 Hook
 * 입력값이 변경될 때만 재계산(Memoization)을 수행
 */
export function useFinancialChange(
  currentPrice: number,
  previousPrice: number,
  options?: AnalyzeChangeOptions & MessageOptions
) {
  return useMemo(() => {
    // 1. 등락 분석
    const summary = analyzeChange(currentPrice, previousPrice, options);

    // 2. 메시지 생성
    const message = buildChangeMessage(currentPrice, previousPrice, options);

    // 3. 스타일 추천
    const style = getStyleRecommendation(summary);

    return {
      summary,
      message,
      style,
      isUp: summary.direction === 'up',
      isDown: summary.direction === 'down',
      isFlat: summary.direction === 'flat',
    };
  }, [currentPrice, previousPrice, options]);
}
