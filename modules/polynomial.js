"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Polynomial = void 0;
const complex_1 = require("./complex");
function isNumberList(list) {
    return (typeof list[0]) === "number";
}
// using generic lists to allow for subsets of any type set/list
function generateSubsets(list, r, start = 0) {
    let result = [];
    if (r <= 0)
        return []; // don't recurse further
    // loop over elements starting at start
    for (let idx = start; idx < list.length; idx++) {
        // if insufficient remaining elements
        // if remaining options (includes current idx) = list.length - (idx - 1) < r
        //      then cannot make subset, so break
        if ((list.length - idx) < r)
            break;
        // decide first element e at index idx
        const e = list[idx];
        // prepend that element to all possible generateSubsets(list[idx:], r-1);
        const tails = generateSubsets(list, r - 1, idx + 1);
        let subresult;
        if (tails.length == 0) // empty tail, thus singleton element
            subresult = [[e]];
        else
            subresult = tails.map(tail => [e].concat(tail));
        result = result.concat(subresult);
    }
    return result;
}
class Polynomial {
    // can either be initialized with list of coeffs (highest degree first)
    // or with a list of complex roots
    constructor(params, as_coeffs = true) {
        if (params.length < 1) {
            console.error("Polynomial object cannot be initialized with empty list");
        }
        if (isNumberList(params)) // cast number list to complex
            params = params.map(n => new complex_1.Complex(n));
        if (as_coeffs) {
            // initialize via coefficients
            this.degree = params.length - 1;
            this.coeffs = params;
        }
        else {
            this.degree = params.length;
            // initialize via roots (Vieta's formulas)
            // reference: https://en.wikipedia.org/wiki/Vieta%27s_formulas
            this.coeffs = [complex_1.Complex.one];
            const n = params.length;
            for (let r = 1; r <= n; r++) {
                // obligatory one-liner
                // subsets.map(subset => subset.reduce((x, y) => x.mul(y))).reduce((x, y) => x.add(y));
                let subsets = generateSubsets(params, r);
                let sum = complex_1.Complex.zero;
                for (const subset of subsets) {
                    let prod = complex_1.Complex.one;
                    for (const element of subset)
                        prod = prod.mul(element);
                    sum = sum.add(prod);
                }
                if (r % 2)
                    sum = sum.mul(-1); // equivalent to multiply by (-1)^r
                this.coeffs.push(sum);
            }
        }
    }
    subsitute(z) {
        let value = complex_1.Complex.zero;
        for (let idx = 0; idx <= this.degree; idx++) {
            const coeff = this.coeffs[idx];
            const exp = this.degree - idx;
            const subvalue = z.pow(exp).mul(coeff);
            value = value.add(subvalue);
        }
        return value;
    }
    differentiate() {
        const new_coeffs = this.coeffs.map((coeff, idx) => coeff.mul(this.degree - idx));
        new_coeffs.pop();
        return new Polynomial(new_coeffs, true);
    }
}
exports.Polynomial = Polynomial;
