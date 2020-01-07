/*
 * Point Utils
 * A point is an array of two numbers e.g. [0, 0].
 */

import kvector from "./vector"
import knumber from "./number"

// Rotate point (around origin unless a center is specified)
export function rotateRad(point: number[], theta: number, center?: number[]) {
  if (center === undefined) {
    return kvector.rotateRad(point, theta)
  } else {
    return kvector.add(
      center,
      kvector.rotateRad(kvector.subtract(point, center), theta)
    )
  }
}

export function rotateDeg(point: number[], theta: number, center?: number[]) {
  if (center === undefined) {
    return kvector.rotateDeg(point, theta)
  } else {
    return kvector.add(
      center,
      kvector.rotateDeg(kvector.subtract(point, center), theta)
    )
  }
}

// Distance between two points
export function distanceToPoint(point1: number[], point2: number[]) {
  return kvector.length(kvector.subtract(point1, point2))
}

// Distance between point and line
export function distanceToLine(point: number[], line: number[][]) {
  var lv = kvector.subtract(line[1], line[0])
  var pv = kvector.subtract(point, line[0])
  var projectedPv = kvector.projection(pv, lv)
  var distancePv = kvector.subtract(projectedPv, pv)
  return kvector.length(distancePv)
}

// Reflect point over line
export function reflectOverLine(point: number[], line: number[][]) {
  var lv = kvector.subtract(line[1], line[0])
  var pv = kvector.subtract(point, line[0])
  var projectedPv = kvector.projection(pv, lv)
  var reflectedPv = kvector.subtract(kvector.scale(projectedPv, 2), pv)
  return kvector.add(line[0], reflectedPv)
}

/**
 * Compares two points, returning -1, 0, or 1, for use with
 * Array.prototype.sort
 *
 * Note: This technically doesn't satisfy the total-ordering
 * requirements of Array.prototype.sort unless equalityTolerance
 * is 0. In some cases very close points that compare within a
 * few equalityTolerances could appear in the wrong order.
 */
export function compare(
  point1: number[],
  point2: number[],
  equalityTolerance = knumber.DEFAULT_TOLERANCE
) {
  if (point1.length !== point2.length) {
    return point1.length - point2.length
  }
  for (var i = 0; i < point1.length; i++) {
    if (!knumber.equal(point1[i], point2[i], equalityTolerance)) {
      return point1[i] - point2[i]
    }
  }
  return 0
}

export default {
  compare,
  reflectOverLine,
  distanceToLine,
  distanceToPoint,
  rotateDeg,
  rotateRad,

  // Check if a value is a point
  is: kvector.is,

  // Add and subtract vector(s)
  addVector: kvector.add,
  addVectors: kvector.add,
  subtractVector: kvector.subtract,
  equal: kvector.equal,

  // Convert from cartesian to polar and back
  polarRadFromCart: kvector.polarRadFromCart,
  polarDegFromCart: kvector.polarDegFromCart,
  cartFromPolarRad: kvector.cartFromPolarRad,
  cartFromPolarDeg: kvector.cartFromPolarDeg,

  // Rounding
  round: kvector.round,
  roundTo: kvector.roundTo,
  floorTo: kvector.floorTo,
  ceilTo: kvector.ceilTo,
}
