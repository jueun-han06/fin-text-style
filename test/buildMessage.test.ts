import { buildChangeMessage } from "../src/buildMessage";

describe("buildChangeMessage 테스트", () => {
  test("기본 메시지 생성", () => {
    const msg = buildChangeMessage(88300, 86000);
    expect(msg).toContain("현재가 88,300원");
    expect(msg).toContain("전일 대비 +2,300원 (+2.67%) 상승");
  });

  test("종목 이름 포함", () => {
    const msg = buildChangeMessage(10000, 9000, { name: "삼성전자" });
    expect(msg.startsWith("삼성전자")).toBe(true);
  });

  test("보합 처리", () => {
    const msg = buildChangeMessage(10000, 10000);
    expect(msg).toContain("변동이 없습니다");
  });

  test("톤 커스텀 적용", () => {
    const msg = buildChangeMessage(12000, 10000, {
      toneConfig: {
        big: { up: "특별한 급등입니다!" }
      }
    });
    expect(msg).toContain("특별한 급등입니다!");
  });
});
