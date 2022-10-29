"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Complex = void 0;
class Complex {
    constructor(re = 0, im = 0) {
        this.re = re;
        this.im = im;
    }
    // scaled(other: number): Complex {
    //     return new Complex(this.re * other, this.im * other);
    // }
    conjugate() {
        return new Complex(this.re, -this.im);
    }
    mag() {
        return Math.sqrt(this.re * this.re + (this.im * this.im));
    }
    copy() {
        return new Complex(this.re, this.im);
    }
    add(other) {
        if (typeof other === "number")
            other = new Complex(other); // todo: scope for optimization
        return new Complex(this.re + other.re, this.im + other.im);
    }
    mul(other) {
        if (typeof other === "number")
            other = new Complex(other); // todo: scope for optimization
        return new Complex(this.re * other.re - this.im * other.im, this.re * other.im + other.re * this.im);
    }
    // multiply by conjugate and divide by modulus squared
    div(other) {
        if (typeof other === "number") {
            return new Complex(this.re / other, this.im / other);
        }
        else {
            const othermag = other.mag();
            return this.mul(other.conjugate()).div(othermag * othermag);
        }
    }
    sub(other) {
        if (typeof other === "number")
            other = new Complex(other); // todo: scope for optimization
        return this.add(other.mul(-1));
    }
    // only defined for non-negative exp
    pow(exp) {
        let result = Complex.one;
        for (let i = 0; i < exp; i++) {
            result = result.mul(this); // todo: scope for optimization
        }
        return result;
    }
    dist(other) {
        return Math.sqrt(this.re * other.re + this.im * other.im);
    }
}
exports.Complex = Complex;
Complex.zero = new Complex(0, 0);
Complex.one = new Complex(1, 0);
Complex.iota = new Complex(0, 1);
