# fin-text-style

한국 금융 서비스 UI를 위한 가격 포맷팅 및 변동 문구 생성 유틸리티입니다.  
토스와 같은 핀테크 환경에서 반복적으로 등장하는 텍스트 처리 로직을 표준화하여 개발 효율성과 유지보수성을 높입니다.

---

## 💡 Background & Design Philosophy

“같은 가격 정보인데 화면마다 왜 표현 방식이 다를까?”

fin-text-style은 실제 금융 서비스를 사용하면서 느꼈던 이러한 문제의식에서 출발했습니다.  
가격 포맷 규칙, 등락률 계산 로직, 자연어 문장 구성 방식이 화면마다 달라 일관된 사용자 경험을 제공하기 어렵다는 점을 발견했습니다.

이 문제를 저는 규칙이 없는 문제가 아니라, 규칙이 흩어져 있는 문제라고 보았습니다.  
그래서 이 프로젝트는 단순한 문자열 변환 함수가 아니라, 금융 텍스트의 도메인 규칙을 명시적으로 모델링한 작은 프레임워크를 지향합니다.

---

## 1. 도메인 모델링 (Domain Modeling)

금융 서비스에서 반복적으로 구현되는 가격 포맷팅, 변동률 계산, 자연어 문장 생성 로직을  
formatPrice, analyzeChange, buildChangeMessage 등 명확한 API로 분리했습니다.

또한 상승/하락 방향, 변동 강도, 추천 색상(Semantic Color), 추천 아이콘 등  
UI에서 바로 사용할 수 있는 메타데이터도 함께 제공하여  
뷰(View)와 로직(Logic)을 보다 깔끔하게 분리할 수 있도록 설계했습니다.

---

## 2. 일관성 & 확장성 (Consistency & Extensibility)

서비스마다 다른 정책을 손쉽게 반영할 수 있는 구조를 고민했습니다.

- DeepPartial 기반 ToneConfig  
  일부 문구만 변경해도 전체 톤 구성이 자연스럽게 병합되도록 만들었습니다.

- Customizable Thresholds  
  small / moderate / big 기준값을 교체하면  
  문장과 변동 레벨(Level)이 자동으로 재계산됩니다.

- Currency & Locale Options  
  원(₩)뿐 아니라 $, ¥ 등 다양한 통화 단위와 로케일을 지원합니다.

정책 변경이 잦은 금융 도메인에서 실제로 필요한 확장성을 높은 수준으로 확보했습니다.

---

## 3. 금융급 안정성 (Reliability)

- Safe Calculation  
  부동소수점 오차 문제(예: 0.1 + 0.2 !== 0.3)를 해결하기 위해 safeRate 로직을 구현했습니다.

- Edge Case Handling  
  전일 종가 0원(신규 상장), 음수 변동, 등락률 0% 등  
  실제 서비스에서 자주 마주치는 예외 상황을 안전하게 처리합니다.

- Strict Typing  
  TypeScript strict 모드를 기반으로 안정적인 타입 모델링을 적용했습니다.

---

## ✨ Features

- 정밀한 숫자 계산 및 등락률 처리  
- 자체 Threshold 기반 변동 강도 판단  
- 한국어 금융 UI 지향 자연어 메시지 생성  
- 접근성(A11Y) 친화적 문장 출력  
- DeepPartial 기반 유연한 문구 커스터마이즈  
- Jest 기반 Unit Test로 핵심 로직 검증  
- 로케일·통화 단위 커스터마이징 지원

---

## 🚀 Getting Started

```bash
npm install fin-text-style
```

---

## 📖 Usage

### 1) 가격 포맷팅 (다국어/다통화 지원)

```ts
import { formatPrice } from "fin-text-style";

formatPrice(1234567); 
// "1,234,567원"

formatPrice(1500, { currencyUnit: "$", locale: "en-US" });
// "1,500$"
```

---

### 2) 등락률 분석 (정책 커스텀)

```ts
import { analyzeChange } from "fin-text-style";

// 기본 정책 (1% 미만 소폭, 3% 이상 급등)
analyzeChange(11000, 10000);
// { direction: "up", rate: 10, level: "big", ... }

// 기준 재정의
analyzeChange(10400, 10000, {
  thresholds: { small: 2, big: 5 }
});
// { direction: "up", rate: 4, level: "moderate", ... }
```

---

### 3) 메시지 생성 (UI & A11Y)

```ts
import { buildChangeMessage } from "fin-text-style";

buildChangeMessage(88300, 86000, { name: "삼성전자" });
// "삼성전자, 현재가 88,300원, 전일 대비 +2,300원 (+2.67%) 상승, 상승 흐름입니다."
```

---

## 🛠 Development

### 테스트 실행

```bash
npm test
```

핵심 로직(방향 판단, 등락률, threshold 변경, edge case)을 Jest로 검증합니다.

### 빌드

```bash
npm run build
```

TypeScript → dist/ 폴더로 컴파일 및 타입 선언 생성.

---

### npm 패키지  
[![npm version](https://img.shields.io/npm/v/fin-text-style.svg)](https://www.npmjs.com/package/fin-text-style)

---

## License

ISC