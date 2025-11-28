import { getStyleRecommendation } from "../src/styleRecommendation";

describe("styleRecommendation 테스트", () => {
  test("상승 강한 흐름", () => {
    const style = getStyleRecommendation({ direction: "up", level: "big" });
    expect(style.semanticColor).toBe("positive");
    expect(style.emphasize).toBe(true);
  });

  test("소폭 하락", () => {
    const style = getStyleRecommendation({ direction: "down", level: "small" });
    expect(style.semanticColor).toBe("negative");
    expect(style.emphasize).toBe(false);
  });

  test("보합 처리", () => {
    const style = getStyleRecommendation({ direction: "flat", level: "small" });
    expect(style.semanticColor).toBe("neutral");
  });
});