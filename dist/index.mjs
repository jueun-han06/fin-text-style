// src/formatPrice.ts
function formatPrice(value, options = {}) {
  const { currencyUnit = "\uC6D0", locale = "ko-KR" } = options;
  if (isNaN(value)) {
    return `0${currencyUnit}`;
  }
  const formatted = value.toLocaleString(locale);
  return `${formatted}${currencyUnit}`;
}

// src/formatChange.ts
var DEFAULT_OPTIONS = {
  thresholds: { small: 1, big: 3 },
  currencySymbol: "\uC6D0"
};
function safeRate(value) {
  return Math.round(value * 100) / 100;
}
function analyzeChange(current, previous, options = {}) {
  const config = { ...DEFAULT_OPTIONS, ...options };
  const { small, big } = config.thresholds || DEFAULT_OPTIONS.thresholds;
  const symbol = config.currencySymbol || "\uC6D0";
  if (previous === 0) {
    return {
      diff: 0,
      diffLabel: `0${symbol}`,
      rate: 0,
      rateLabel: "0.00%",
      direction: "flat",
      level: "small"
    };
  }
  const diff = current - previous;
  const rawRate = diff / previous * 100;
  const rate = safeRate(rawRate);
  const direction = diff > 0 ? "up" : diff < 0 ? "down" : "flat";
  const absRate = Math.abs(rate);
  let level;
  if (absRate < small) {
    level = "small";
  } else if (absRate < big) {
    level = "moderate";
  } else {
    level = "big";
  }
  const diffSign = diff > 0 ? "+" : diff < 0 ? "-" : "";
  const rateSign = rate > 0 ? "+" : rate < 0 ? "-" : "";
  const diffLabel = `${diffSign}${Math.abs(diff).toLocaleString("ko-KR")}${symbol}`;
  const rateLabel = `${rateSign}${absRate.toFixed(2)}%`;
  return {
    diff,
    diffLabel,
    rate,
    rateLabel,
    direction,
    level
  };
}

// src/buildMessage.ts
var defaultToneConfig = {
  small: {
    up: "\uC18C\uD3ED \uC0C1\uC2B9\uC785\uB2C8\uB2E4.",
    down: "\uC18C\uD3ED \uD558\uB77D\uC785\uB2C8\uB2E4.",
    flat: "\uAC70\uC758 \uBCC0\uB3D9\uC774 \uC5C6\uC2B5\uB2C8\uB2E4."
  },
  moderate: {
    up: "\uC0C1\uC2B9 \uD750\uB984\uC785\uB2C8\uB2E4.",
    down: "\uD558\uB77D \uD750\uB984\uC785\uB2C8\uB2E4.",
    flat: "\uC548\uC815\uC801\uC778 \uD750\uB984\uC785\uB2C8\uB2E4."
  },
  big: {
    up: "\uAE09\uB4F1\uD55C \uC0C1\uD0DC\uC785\uB2C8\uB2E4.",
    down: "\uAE09\uB77D\uD55C \uC0C1\uD0DC\uC785\uB2C8\uB2E4.",
    flat: "\uD070 \uBCC0\uB3D9 \uC5C6\uC774 \uC720\uC9C0\uB418\uACE0 \uC788\uC2B5\uB2C8\uB2E4."
  }
};
function pickTone(change, tone) {
  const bucket = tone[change.level];
  if (!bucket) return "";
  if (change.direction === "up") return bucket.up;
  if (change.direction === "down") return bucket.down;
  return bucket.flat;
}
function buildChangeMessage(current, previous, options = {}) {
  var _a, _b, _c;
  const { name } = options;
  const toneConfig = {
    small: { ...defaultToneConfig.small, ...(_a = options.toneConfig) == null ? void 0 : _a.small },
    moderate: { ...defaultToneConfig.moderate, ...(_b = options.toneConfig) == null ? void 0 : _b.moderate },
    big: { ...defaultToneConfig.big, ...(_c = options.toneConfig) == null ? void 0 : _c.big }
  };
  const baseLabel = name ? `${name}, ` : "";
  const currentLabel = `\uD604\uC7AC\uAC00 ${formatPrice(current)}`;
  const change = analyzeChange(current, previous);
  const directionLabel = change.direction === "up" ? "\uC0C1\uC2B9" : change.direction === "down" ? "\uD558\uB77D" : "\uBCF4\uD569";
  if (change.direction === "flat") {
    return `${baseLabel}${currentLabel}, \uC804\uC77C \uB300\uBE44 \uBCC0\uB3D9\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.`;
  }
  const toneSentence = pickTone(change, toneConfig);
  return `${baseLabel}${currentLabel}, \uC804\uC77C \uB300\uBE44 ${change.diffLabel} (${change.rateLabel}) ${directionLabel}, ${toneSentence}`;
}

// src/styleRecommendation.ts
function getStyleRecommendation(input) {
  const { direction, level } = input;
  if (direction === "up") {
    return {
      semanticColor: "positive",
      colorToken: level === "big" ? "priceUpStrong" : "priceUp",
      icon: "arrowUp",
      emphasize: level === "big"
    };
  }
  if (direction === "down") {
    return {
      semanticColor: "negative",
      colorToken: level === "big" ? "priceDownStrong" : "priceDown",
      icon: "arrowDown",
      emphasize: level === "big"
    };
  }
  return {
    semanticColor: "neutral",
    colorToken: "priceNeutral",
    icon: "minus",
    emphasize: false
  };
}

// src/a11yMessage.ts
function buildA11yChangeLabel(current, previous, options = {}) {
  const { name } = options;
  const baseLabel = name ? `${name}, ` : "";
  const currentLabel = `\uD604\uC7AC\uAC00 ${formatPrice(current)}`;
  const change = analyzeChange(current, previous);
  if (change.direction === "flat") {
    return `${baseLabel}${currentLabel}, \uC804\uC77C \uB300\uBE44 \uBCC0\uB3D9\uC774 \uAC70\uC758 \uC5C6\uC2B5\uB2C8\uB2E4.`;
  }
  const absRate = Math.abs(change.rate);
  const rateLabel = `${absRate.toFixed(2)}\uD37C\uC13C\uD2B8`;
  const directionLabel = change.direction === "up" ? "\uC0C1\uC2B9\uD588\uC2B5\uB2C8\uB2E4." : "\uD558\uB77D\uD588\uC2B5\uB2C8\uB2E4.";
  return `${baseLabel}${currentLabel}, \uC804\uC77C \uB300\uBE44 ${rateLabel} ${directionLabel}`;
}

// src/hooks/useFinancialChange.ts
import { useMemo } from "react";
function useFinancialChange(currentPrice, previousPrice, options) {
  return useMemo(() => {
    const summary = analyzeChange(currentPrice, previousPrice, options);
    const message = buildChangeMessage(currentPrice, previousPrice, options);
    const style = getStyleRecommendation(summary);
    return {
      summary,
      message,
      style,
      isUp: summary.direction === "up",
      isDown: summary.direction === "down",
      isFlat: summary.direction === "flat"
    };
  }, [currentPrice, previousPrice, options]);
}
export {
  analyzeChange,
  buildA11yChangeLabel,
  buildChangeMessage,
  formatPrice,
  getStyleRecommendation,
  useFinancialChange
};
