// @flow

import * as number from "../number.js";

describe("knumber", function () {
    it("two equal numbers should be equal", function () {
        var result = number.equal(1 / 3, (1 / 90) * 30);
        expect(result).toBe(true);
    });

    it("two different numbers should be equal", function () {
        var result = number.equal(1 / 3, 1.333333);
        expect(result).toBe(false);
    });

    it("Infinity should equal Infinity", function () {
        var result = number.equal(
            Number.POSITIVE_INFINITY,
            Number.POSITIVE_INFINITY
        );
        expect(result).toBe(true);
    });

    it("+Infinity should not equal -Infinity", function () {
        var result = number.equal(
            Number.POSITIVE_INFINITY,
            Number.NEGATIVE_INFINITY
        );
        expect(result).toBe(false);
    });

    it("sign(0) should be 0", function () {
        expect(number.sign(0)).toBe(0);
    });

    it("sign(-0.0) should be 0", function () {
        expect(number.sign(-0.0)).toBe(0);
    });

    it("sign(3.2) should be 1", function () {
        expect(number.sign(3.2)).toBe(1);
    });

    it("sign(-2.8) should be -1", function () {
        expect(number.sign(-2.8)).toBe(-1);
    });

    it("isInteger(-2.8) should be false", function () {
        expect(number.isInteger(-2.8)).toBe(false);
    });

    it("isInteger(-2) should be true", function () {
        expect(number.isInteger(-2)).toBe(true);
    });

    it("toFraction(-2) should be -2/1", function () {
        expect(number.toFraction(-2)).toStrictEqual([-2, 1]);
    });

    it("toFraction(-2.5) should be -5/2", function () {
        expect(number.toFraction(-2.5)).toStrictEqual([-5, 2]);
    });

    it("toFraction(2/3) should be 2/3", function () {
        expect(number.toFraction(2 / 3)).toStrictEqual([2, 3]);
    });

    it("toFraction(283.33...) should be 850/3", function () {
        expect(number.toFraction(283 + 1 / 3)).toStrictEqual([850, 3]);
    });

    it("toFraction(0) should be 0/1", function () {
        expect(number.toFraction(0)).toStrictEqual([0, 1]);
    });

    it("toFraction(pi) should be pi/1", function () {
        expect(number.toFraction(Math.PI)).toStrictEqual([Math.PI, 1]);
    });

    it("toFraction(0.66) should be 33/50", function () {
        expect(number.toFraction(0.66)).toStrictEqual([33, 50]);
    });

    it("toFraction(0.66, 0.01) should be 2/3", function () {
        expect(number.toFraction(0.66, 0.01)).toStrictEqual([2, 3]);
    });
});
