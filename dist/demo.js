"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formatPrice_1 = require("./formatPrice");
console.log((0, formatPrice_1.formatPrice)(1234567));
console.log((0, formatPrice_1.formatPrice)(89000));
console.log((0, formatPrice_1.formatPrice)(1200.5));
console.log((0, formatPrice_1.formatPrice)(-5000));
