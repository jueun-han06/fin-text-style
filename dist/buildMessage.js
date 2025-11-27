"use strict";
// buildMessage.ts
// 종목 이름, 현재가, 이전가를 받아서
// "삼성전자, 전일 대비 2.7% 상승(소폭 상승입니다)" 같은 문장을 만들어 주는 함수
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildChangeMessage = buildChangeMessage;
const formatPrice_1 = require("./formatPrice");
const formatChange_1 = require("./formatChange");
const defaultToneConfig = {
    small: {
        up: "소폭 상승입니다.",
        down: "소폭 하락입니다.",
        flat: "거의 변동이 없습니다.",
    },
    moderate: {
        up: "상승 흐름입니다.",
        down: "하락 흐름입니다.",
        flat: "안정적인 흐름입니다.",
    },
    big: {
        up: "급등한 상태입니다.",
        down: "급락한 상태입니다.",
        flat: "큰 변동 없이 유지되고 있습니다.",
    },
};
function pickTone(change, tone) {
    const bucket = tone[change.level];
    // 방어 로직: 혹시라도 level에 맞는 설정이 없을 경우를 대비
    if (!bucket)
        return "";
    if (change.direction === "up")
        return bucket.up;
    if (change.direction === "down")
        return bucket.down;
    return bucket.flat;
}
function buildChangeMessage(current, previous, options = {}) {
    var _a, _b, _c;
    const { name } = options;
    // [설정 병합] 사용자가 입력한 설정(options.toneConfig)과 기본 설정(defaultToneConfig)을 합칩니다.
    // 사용자가 일부만 적었어도 나머지는 기본값이 채워져서 에러가 안 납니다.
    const toneConfig = {
        small: { ...defaultToneConfig.small, ...(_a = options.toneConfig) === null || _a === void 0 ? void 0 : _a.small },
        moderate: { ...defaultToneConfig.moderate, ...(_b = options.toneConfig) === null || _b === void 0 ? void 0 : _b.moderate },
        big: { ...defaultToneConfig.big, ...(_c = options.toneConfig) === null || _c === void 0 ? void 0 : _c.big },
    };
    const baseLabel = name ? `${name}, ` : "";
    const currentLabel = `현재가 ${(0, formatPrice_1.formatPrice)(current)}`;
    const change = (0, formatChange_1.analyzeChange)(current, previous);
    const directionLabel = change.direction === "up"
        ? "상승"
        : change.direction === "down"
            ? "하락"
            : "보합";
    if (change.direction === "flat") {
        return `${baseLabel}${currentLabel}, 전일 대비 변동이 없습니다.`;
    }
    const toneSentence = pickTone(change, toneConfig);
    return (`${baseLabel}${currentLabel}, ` +
        `전일 대비 ${change.diffLabel} (${change.rateLabel}) ${directionLabel}, ` +
        `${toneSentence}`);
}
