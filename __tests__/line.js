// @flow

import * as line from "../line.js";

describe("kline", function() {
    it("two identical lines should be equal", function() {
        var result = line.equal(
            [
                [1, 1],
                [3, 3]
            ],
            [
                [1, 1],
                [3, 3]
            ]
        );
        expect(result).toBe(true);
    });

    it("two parallel lines should not be equal", function() {
        var result = line.equal(
            [
                [1, 1],
                [3, 3]
            ],
            [
                [1, 2],
                [3, 4]
            ]
        );
        expect(result).toBe(false);
    });

    it("two intersecting lines should not be equal", function() {
        var result = line.equal(
            [
                [1, 1],
                [3, 3]
            ],
            [
                [1, 1],
                [3, 4]
            ]
        );
        expect(result).toBe(false);
    });

    it("two collinear lines should be equal #1", function() {
        var result = line.equal(
            [
                [1, 1],
                [3, 3]
            ],
            [
                [0, 0],
                [5, 5]
            ]
        );
        expect(result).toBe(true);
    });

    it("two collinear lines should be equal #2", function() {
        var result = line.equal(
            [
                [4, 4],
                [5, 5]
            ],
            [
                [0, 0],
                [1, 1]
            ]
        );
        expect(result).toBe(true);
    });

    it("two collinear lines should be equal #3", function() {
        var result = line.equal(
            [
                [0, 0],
                [1, 1]
            ],
            [
                [3, 3],
                [6, 6]
            ]
        );
        expect(result).toBe(true);
    });
});
