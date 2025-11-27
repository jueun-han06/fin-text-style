import { formatPrice } from "./formatPrice";
import { analyzeChange } from "./formatChange";
import { buildChangeMessage } from "./buildMessage";
import { recommendStyle } from "./styleRecommendation";
import { buildA11yChangeLabel } from "./a11yMessage";

const current = 88300;
const previous = 86000;

console.log("가격:", formatPrice(current));

const summary = analyzeChange(current, previous);
console.log("요약:", summary);

console.log(
  "일반 사용자용 메시지:",
  buildChangeMessage(current, previous, { name: "삼성전자" }),
);

console.log("스타일 추천:", recommendStyle(summary));

console.log(
  "A11Y 라벨:",
  buildA11yChangeLabel(current, previous, { name: "삼성전자" }),
);