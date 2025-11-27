import { analyzeChange } from "../src/formatChange";

// 'describe'는 테스트들을 그룹으로 묶어주는 역할입니다.
describe("analyzeChange 함수 테스트", () => {
  
  test("상승장: 가격이 올랐을 때 정확한 정보를 반환한다", () => {
    // 10,000원 -> 11,000원 (10% 상승)
    const result = analyzeChange(11000, 10000);

    expect(result.direction).toBe("up");      // 방향은 up이어야 함
    expect(result.rate).toBe(10);             // 등락률은 10이어야 함
    expect(result.diffLabel).toBe("+1,000원"); // 텍스트는 +1,000원이어야 함
    expect(result.level).toBe("big");         // 3% 넘었으니 big이어야 함
  });

  test("하락장: 가격이 내렸을 때 마이너스 부호가 붙는다", () => {
    // 10,000원 -> 9,000원 (10% 하락)
    const result = analyzeChange(9000, 10000);

    expect(result.direction).toBe("down");
    expect(result.rate).toBe(-10);
    expect(result.diffLabel).toBe("-1,000원");
    expect(result.rateLabel).toContain("-10.00%");
  });

  test("옵션 설정: 급등 기준(Threshold)을 변경할 수 있다", () => {
    // 5% 상승이지만, 사용자가 '급등 기준'을 10%로 높게 설정하면
    // 결과는 'big'이 아니라 'moderate'가 나와야 함
    const result = analyzeChange(10500, 10000, {
      thresholds: { small: 2, big: 10 }
    });
    
    expect(result.rate).toBe(5);
    expect(result.level).toBe("moderate"); 
  });

  test("통화 단위 변경: 달러($)로 변경할 수 있다", () => {
    // 옵션으로 '$'를 넘김
    const result = analyzeChange(120, 100, { currencySymbol: "$" });
    expect(result.diffLabel).toBe("+20$");
  });

  test("오류 방어: 전일 종가가 0원일 때 안전하게 처리한다", () => {
    // 0원으로 나누면 에러가 날 수 있는데, 이를 잘 막았는지 확인
    const result = analyzeChange(500, 0);
    expect(result.direction).toBe("flat");
    expect(result.rate).toBe(0);
  });
});