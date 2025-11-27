# fin-text-style

한국 금융 서비스 UI에서 자주 사용하는 가격, 등락, 변동 설명 문구를  
일관된 규칙으로 생성해 주는 TypeScript 유틸리티입니다.

가격 포맷팅부터 등락률 계산, 변동 강도(level) 처리, 자연어 문장 생성까지  
서비스 곳곳에서 반복되는 로직을 한 곳에 모아 개발 효율을 높입니다.

---

## Install

```bash
npm install fin-text-style
```

또는 로컬 개발:

```bash
git clone https://github.com/jueun-han06/fin-text-style.git
cd fin-text-style
npm install
```

---

## Features

- **숫자를 한국어 가격 문자열로 변환**  
  예: `1234567 → "1,234,567원"`

- **현재가와 전일가 비교 (금액/등락률/방향 계산)**  
  up / down / flat 자동 판별

- **변동 폭에 따라 변동 강도(level) 판별**  
  예: 소폭 상승, 보통 하락, 급락 등

- **변동 데이터를 기반으로 자연어 문장 생성**  
  예:  
  `"현재가 88,300원, 전일 대비 +2,300원 (+2.67%) 상승, 상승 흐름입니다."`

- **UI 스타일 추천 정보 제공**  
  semanticColor (positive / negative / neutral)  
  colorToken (priceUpStrong 등)  
  icon (arrowUp 등)  
  emphasize (강조 여부)

- **접근성(A11Y)용 문장 생성 기능**  
  스크린리더가 읽기 좋도록 정제된 문장 출력  
  예:  
  `"현재가 88,300원, 전일 대비 2.67퍼센트 상승했습니다."`

---

## Example

```ts
import { formatPrice, formatChange, buildMessage } from "fin-text-style";

// 가격 포맷팅
formatPrice(1234567);
// "1,234,567원"

// 등락 계산
formatChange({ current: 88300, previous: 86000 });
/*
{
  amount: 2300,
  rate: 2.67,
  direction: "up",
  level: "moderate"
}
*/

// 자연어 문장 생성
buildMessage({ current: 88300, previous: 86000 });
// "현재가 88,300원, 전일 대비 +2,300원 (+2.67%) 상승, 상승 흐름입니다."
```

---

## API Reference

### `formatPrice(value)`
숫자를 한국어 가격 문자열로 변환합니다.  
천 단위 콤마, 음수, 0원 등 엣지 케이스도 함께 처리합니다.

---

### `formatChange({ current, previous })`
현재가와 전일가를 비교해  
금액, 등락률, 방향(up/down/flat), 변동 강도(level)를 계산합니다.

---

### `buildMessage({ current, previous })`
변동 데이터를 기반으로 자연어 설명 문구를 생성합니다.  
실제 서비스 UI에서 바로 사용할 수 있는 형태의 문장입니다.

---

## Why this library?

실제 금융 서비스에서는 다음을 반복적으로 구현해야 합니다:

- 가격 포맷 규칙 통일  
- 등락 판단 기준 통일  
- 자연어 문구 규칙 통일  
- 접근성 텍스트 별도 처리  

이 라이브러리는 이러한 반복 작업을 단순화하고  
UI 컴포넌트는 데이터만 받아 곧바로 표기할 수 있도록 돕습니다.

---

## License
ISC

---

## Maintainer
hanjueun6267@naver.com