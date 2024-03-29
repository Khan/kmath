/**
 * Vector Utils
 * A vector is an array of numbers e.g. [0, 3, 4].
 *
 * @flow
 */

import _ from "underscore";
import * as knumber from "./number.js";

function arraySum(array: $ReadOnlyArray<number>): number {
    return array.reduce((memo, arg) => memo + arg, 0);
}

function arrayProduct(array: $ReadOnlyArray<number>): number {
    return array.reduce((memo, arg) => memo * arg, 1);
}

export function is<T>(vec: $ReadOnlyArray<T>, dimension: number): boolean {
    if (!_.isArray(vec)) {
        return false;
    }
    if (dimension !== undefined && vec.length !== dimension) {
        return false;
    }
    return vec.every(knumber.is);
}

// Normalize to a unit vector
export function normalize(v: $ReadOnlyArray<number>): $ReadOnlyArray<number> {
    return scale(v, 1 / length(v));
}

// Length/magnitude of a vector
export function length(v: $ReadOnlyArray<number>): number {
    return Math.sqrt(dot(v, v));
}
// Dot product of two vectors
export function dot(
    a: $ReadOnlyArray<number>,
    b: $ReadOnlyArray<number>
): number {
    var zipped = _.zip(a, b);
    var multiplied = zipped.map(arrayProduct);
    return arraySum(multiplied);
}

/* vector-add multiple [x, y] coords/vectors
 *
 * add([1, 2], [3, 4]) -> [4, 6]
 */
export function add(
    ...vecs: $ReadOnlyArray<$ReadOnlyArray<number>>
): $ReadOnlyArray<number> {
    var zipped = _.zip(...vecs);
    return zipped.map(arraySum);
}

export function subtract(
    v1: $ReadOnlyArray<number>,
    v2: $ReadOnlyArray<number>
): $ReadOnlyArray<number> {
    return _.zip(v1, v2).map((dim) => dim[0] - dim[1]);
}

export function negate(v: $ReadOnlyArray<number>): $ReadOnlyArray<number> {
    return v.map((x) => {
        return -x;
    });
}

// Scale a vector
export function scale(
    v1: $ReadOnlyArray<number>,
    scalar: number
): $ReadOnlyArray<number> {
    return v1.map((x) => {
        return x * scalar;
    });
}

export function equal(
    v1: $ReadOnlyArray<number>,
    v2: $ReadOnlyArray<number>,
    tolerance?: number
): boolean {
    // _.zip will nicely deal with the lengths, going through
    // the length of the longest vector. knumber.equal then
    // returns false for any number compared to the undefined
    // passed in if one of the vectors is shorter.
    return _.zip(v1, v2).every((pair) =>
        knumber.equal(pair[0], pair[1], tolerance)
    );
}

export function codirectional(
    v1: $ReadOnlyArray<number>,
    v2: $ReadOnlyArray<number>,
    tolerance?: number
): boolean {
    // The origin is trivially codirectional with all other vectors.
    // This gives nice semantics for codirectionality between points when
    // comparing their difference vectors.
    if (
        knumber.equal(length(v1), 0, tolerance) ||
        knumber.equal(length(v2), 0, tolerance)
    ) {
        return true;
    }

    v1 = normalize(v1);
    v2 = normalize(v2);

    return equal(v1, v2, tolerance);
}

export function collinear(
    v1: $ReadOnlyArray<number>,
    v2: $ReadOnlyArray<number>,
    tolerance?: number
): boolean {
    return (
        codirectional(v1, v2, tolerance) ||
        codirectional(v1, negate(v2), tolerance)
    );
}

// Convert a cartesian coordinate into a radian polar coordinate
export function polarRadFromCart(
    v: $ReadOnlyArray<number>
): $ReadOnlyArray<number> {
    var radius = length(v);
    var theta = Math.atan2(v[1], v[0]);

    // Convert angle range from [-pi, pi] to [0, 2pi]
    if (theta < 0) {
        theta += 2 * Math.PI;
    }

    return [radius, theta];
}

// Converts a cartesian coordinate into a degree polar coordinate
export function polarDegFromCart(
    v: $ReadOnlyArray<number>
): $ReadOnlyArray<number> /* TODO: convert to tuple/Point */ {
    var polar = polarRadFromCart(v);
    return [polar[0], (polar[1] * 180) / Math.PI];
}

/* Convert a polar coordinate into a cartesian coordinate
 *
 * Examples:
 * cartFromPolarRad(5, Math.PI)
 * cartFromPolarRad([5, Math.PI])
 */
export function cartFromPolarRad(
    radius: number,
    theta?: number = 0
): $ReadOnlyArray<number> /* TODO: convert to tuple/Point */ {
    return [radius * Math.cos(theta), radius * Math.sin(theta)];
}

/* Convert a polar coordinate into a cartesian coordinate
 *
 * Examples:
 * cartFromPolarDeg(5, 30)
 * cartFromPolarDeg([5, 30])
 */
export function cartFromPolarDeg(
    radius: number,
    theta?: number = 0
): $ReadOnlyArray<number> {
    return cartFromPolarRad(radius, (theta * Math.PI) / 180);
}

// Rotate vector
export function rotateRad(
    v: $ReadOnlyArray<number>,
    theta: number
): $ReadOnlyArray<number> {
    var polar = polarRadFromCart(v);
    var angle = polar[1] + theta;
    return cartFromPolarRad(polar[0], angle);
}

export function rotateDeg(
    v: $ReadOnlyArray<number>,
    theta: number
): $ReadOnlyArray<number> {
    var polar = polarDegFromCart(v);
    var angle = polar[1] + theta;
    return cartFromPolarDeg(polar[0], angle);
}

// Angle between two vectors
export function angleRad(
    v1: $ReadOnlyArray<number>,
    v2: $ReadOnlyArray<number>
): number {
    return Math.acos(dot(v1, v2) / (length(v1) * length(v2)));
}

export function angleDeg(
    v1: $ReadOnlyArray<number>,
    v2: $ReadOnlyArray<number>
): number {
    return (angleRad(v1, v2) * 180) / Math.PI;
}

// Vector projection of v1 onto v2
export function projection(
    v1: $ReadOnlyArray<number>,
    v2: $ReadOnlyArray<number>
): $ReadOnlyArray<number> {
    var scalar = dot(v1, v2) / dot(v2, v2);
    return scale(v2, scalar);
}

// Round each number to a certain number of decimal places
export function round(
    vec: $ReadOnlyArray<number>,
    precision: $ReadOnlyArray<number> | number
): $ReadOnlyArray<number> {
    return vec.map((elem, i) =>
        // $FlowFixMe[prop-missing]
        // $FlowFixMe[incompatible-call]
        knumber.round(elem, precision[i] || precision)
    );
}

// Round each number to the nearest increment
export function roundTo(
    vec: $ReadOnlyArray<number>,
    increment: $ReadOnlyArray<number> | number
): $ReadOnlyArray<number> {
    return vec.map((elem, i) =>
        // $FlowFixMe[prop-missing]
        // $FlowFixMe[incompatible-call]
        knumber.roundTo(elem, increment[i] || increment)
    );
}

export function floorTo(
    vec: $ReadOnlyArray<number>,
    increment: $ReadOnlyArray<number> | number
): $ReadOnlyArray<number> {
    return vec.map((elem, i) =>
        // $FlowFixMe[prop-missing]
        // $FlowFixMe[incompatible-call]
        knumber.floorTo(elem, increment[i] || increment)
    );
}

export function ceilTo(
    vec: $ReadOnlyArray<number>,
    increment: $ReadOnlyArray<number> | number
): $ReadOnlyArray<number> {
    return vec.map((elem, i) =>
        // $FlowFixMe[prop-missing]
        // $FlowFixMe[incompatible-call]
        knumber.ceilTo(elem, increment[i] || increment)
    );
}
