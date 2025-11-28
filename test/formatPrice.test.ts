import { formatPrice } from "../src/formatPrice";

describe("formatPrice 테스트", () => {
  test("기본 원화 포맷", () => {
    expect(formatPrice(1234567)).toBe("1,234,567원");
  });

  test("달러 포맷 적용", () => {
    expect(formatPrice(1500, { currencyUnit: "$", locale: "en-US" }))
      .toBe("1,500$");
  });

  test("NaN 처리", () => {
    expect(formatPrice(NaN)).toBe("0원");
  });

  test("음수 금액 처리", () => {
    expect(formatPrice(-3200)).toBe("-3,200원");
  });

  test("로케일 변경 지원", () => {
    expect(formatPrice(1000000, { locale: "en-US", currencyUnit: "$" }))
      .toBe("1,000,000$");
  });
});