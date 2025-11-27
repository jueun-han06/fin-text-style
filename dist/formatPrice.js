"use strict";
// formatPrice.ts
// 가격을 보기 좋게 포맷팅하는 함수
// ex) 1532000 → "1,532,000원"
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPrice = formatPrice;
function formatPrice(value) {
    if (isNaN(value)) {
        return "0원";
    }
    // 숫자에 ,(콤마) 붙이기: 1532000 → 1,532,000
    const formatted = value.toLocaleString("ko-KR");
    return `${formatted}원`;
}
