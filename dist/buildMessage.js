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
    const bucket = tone[change.level]; // small / moderate / big 중 하나
    if (change.direction === "up")
        return bucket.up;
    if (change.direction === "down")
        return bucket.down;
    return bucket.flat;
}
function buildChangeMessage(current, previous, options = {}) {
    const { name, toneConfig = defaultToneConfig } = options;
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
