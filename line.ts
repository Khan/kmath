/*
 * Line Utils
 * A line can be described with an array of two points e.g. [[-5, 0], [5, 0]].
 */

import kpoint from "./point"
import kvector from "./vector"
import { DEFAULT_TOLERANCE, toFraction } from "./number"

function distanceToPoint(line: number[][], point: number[]) {
  return kpoint.distanceToLine(point, line)
}

function reflectPoint(line: number[][], point: number[]) {
  return kpoint.reflectOverLine(point, line)
}

function midpoint(line: number[][]) {
  return [(line[0][0] + line[1][0]) / 2, (line[0][1] + line[1][1]) / 2]
}

function slope(line: number[][]) {
  return (line[1][1] - line[0][1]) / (line[1][0] - line[0][0])
}

function intercepts(line: number[][]) {
  let m = slope(line)
  // b = y - mx
  let yIntercept = line[1][1] - m * line[1][0]
  // x = -b/m
  let xIntercept = -yIntercept / m
  return [xIntercept, yIntercept]
}

// return coefficients m and b for y = mx + b
function getSlopeIntercept(line: number[][]) {
  let m = (line[1][1] - line[0][1]) / (line[1][0] - line[0][0])
  let b = line[1][1] - m * line[1][0]
  return [m, b]
}

// returns coefficients A, B, and C for Ax + By = C, with constraints that A > 0,
// and A, B, and C are integers.
function getStandardLine(line: number[][]) {
  let [m, b] = getSlopeIntercept(line)
  let _A = toFraction(-m)
  let _C = toFraction(b)

  // find lcm of _A and _C
  let mod, gcd, lcm
  let a = Math.abs(_A[1])
  let c = Math.abs(_C[1])

  while (c) {
    mod = a % c
    a = c
    c = mod
  }

  gcd = a
  lcm = Math.abs(_A[1] * _C[1]) / gcd

  return m > 0
    ? [(-_A[0] * lcm) / _A[1], -lcm, -(_C[0] * lcm) / _C[1]]
    : [(_A[0] * lcm) / _A[1], lcm, (_C[0] * lcm) / _C[1]]
}

function equal(
  line1: number[][],
  line2: number[][],
  tolerance = DEFAULT_TOLERANCE
) {
  // TODO: A nicer implementation might just check collinearity of
  // vectors using underscore magick
  // Compare the directions of the lines
  var v1 = kvector.subtract(line1[1], line1[0])
  var v2 = kvector.subtract(line2[1], line2[0])
  if (!kvector.collinear(v1, v2, tolerance)) {
    return false
  }
  // If the start point is the same for the two lines, then they are the same
  if (kpoint.equal(line1[0], line2[0])) {
    return true
  }
  // Make sure that the direction to get from line1 to
  // line2 is the same as the direction of the lines
  var line1ToLine2Vector = kvector.subtract(line2[0], line1[0])
  return kvector.collinear(v1, line1ToLine2Vector, tolerance)
}

export default {
  equal,
  midpoint,
  slope,
  intercepts,
  reflectPoint,
  distanceToPoint,
  getSlopeIntercept,
  getStandardLine,
}
