"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const complex_1 = require("../modules/complex");
const polynomial_1 = require("../modules/polynomial");
const utils_1 = require("./utils");
const z1 = new complex_1.Complex(1, 3);
const z2 = new complex_1.Complex(5, -2);
console.log("z1", z1);
console.log("z2", z2);
console.log("conjugate(z1)", z1.conjugate());
console.log("mag(z1)", z1.mag());
console.log("z1*z2", z1.mul(z2));
console.log("z1/z2", z1.div(z2));
// x^2 + 2x + 1
let p = new polynomial_1.Polynomial([1, 2, 1]);
console.log(p.subsitute(complex_1.Complex.zero));
const roots = [1, 3, -5];
let p2 = new polynomial_1.Polynomial(roots, false);
console.log("p2", "roots:", roots, p2.coeffs);
for (const root of roots) {
    console.log("for root", root, p2.subsitute(new complex_1.Complex(root)));
}
console.log(new polynomial_1.Polynomial([complex_1.Complex.iota, complex_1.Complex.iota, complex_1.Complex.iota], false).differentiate());
let p3 = new polynomial_1.Polynomial([1, 0, -1]);
let z = new complex_1.Complex(-0.2, 0);
console.log((0, utils_1.iterate)(p3, z, 10));
