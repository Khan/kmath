/*
 * Vector Utils
 * A vector is an array of numbers e.g. [0, 3, 4].
 */

import knumber from "./number"

// like Σ n
export function arraySum(array: number[]) {
  return array.reduce(function(memo, arg) {
    return memo + arg
  }, 0)
}

export function is(vec: any, dimension?: number) {
  if (!Array.isArray(vec)) {
    return false
  }
  if (dimension !== undefined && vec.length !== dimension) {
    return false
  }
  return vec.every(knumber.is)
}

// Normalize to a unit vector
export function normalize(v: number[]) {
  return scale(v, 1 / length(v))
}

// Length/magnitude of a vector
export function length(v: number[]) {
  return Math.sqrt(dot(v, v))
}

// Dot product of multiple vectors
export function dot(a: number[], b: number[]) {
  // vectors must be same length to perform a dot product
  if (a.length !== b.length) {
    throw TypeError("Vectors must be same dimension to perform dot product")
  }
  var dotted = a.map((c, i) => c * b[i])
  return arraySum(dotted)
}

/* vector-add multiple [x, y] coords/vectors
 *
 * add([1, 2], [3, 4]) -> [4, 6]
 */
export function add(...vectors: number[][]) {
  let len = vectors[0].length
  // create 0 vector of length len
  let zeroVector = Array.from({ length: len }, () => 0)
  return vectors.reduce((acc, vec) => {
    if (vec.length !== len) {
      throw TypeError("vectors must be same dimension to add")
    }
    return acc.map((c, i) => c + vec[i])
  }, zeroVector)
}

export function subtract(v1: number[], v2: number[]) {
  if (v1.length !== v2.length) {
    throw TypeError("vectors must be same dimension to subtract")
  }
  return v1.map((c, i) => c - v2[i])
}

export function negate(v: number[]) {
  return v.map(c => -c)
}

// Scale a vector
export function scale(v1: number[], scalar: number) {
  return v1.map(c => c * scalar)
}

export function equal(
  v1: number[],
  v2: number[],
  tolerance = knumber.DEFAULT_TOLERANCE
) {
  if (v1.length !== v2.length) return false
  return v1.every((c, i) => knumber.equal(c, v2[i], tolerance))
}

export function codirectional(
  v1: number[],
  v2: number[],
  tolerance = knumber.DEFAULT_TOLERANCE
) {
  // The origin is trivially codirectional with all other vectors.
  // This gives nice semantics for codirectionality between points when
  // comparing their difference vectors.
  if (
    knumber.equal(length(v1), 0, tolerance) ||
    knumber.equal(length(v2), 0, tolerance)
  ) {
    return true
  }

  v1 = normalize(v1)
  v2 = normalize(v2)

  return equal(v1, v2, tolerance)
}

export function collinear(
  v1: number[],
  v2: number[],
  tolerance = knumber.DEFAULT_TOLERANCE
) {
  return (
    codirectional(v1, v2, tolerance) || codirectional(v1, negate(v2), tolerance)
  )
}

// Convert a cartesian coordinate into a radian polar coordinate
export function polarRadFromCart(v: number[]) {
  var radius = length(v)
  var theta = Math.atan2(v[1], v[0])

  // Convert angle range from [-pi, pi] to [0, 2pi]
  if (theta < 0) {
    theta += 2 * Math.PI
  }

  return [radius, theta]
}

// Converts a cartesian coordinate into a degree polar coordinate
export function polarDegFromCart(v: number[]) {
  var polar = polarRadFromCart(v)
  return [polar[0], (polar[1] * 180) / Math.PI]
}

/* Convert a polar coordinate into a cartesian coordinate
 *
 * Examples:
 * cartFromPolarRad(5, Math.PI)
 * cartFromPolarRad([5, Math.PI])
 */
export function cartFromPolarRad(radius: number | number[], theta?: number) {
  let angle: number, rad: number
  if (Array.isArray(radius)) {
    angle = radius[1]
    rad = radius[0]
  } else if (theta === undefined) {
    let error = "theta was not defined. Either supply a second argument to the"
    error += " cartFromPolarRad function or make the first argument an array"
    throw TypeError(error)
  } else {
    angle = theta
    rad = radius
  }

  return [rad * Math.cos(angle), rad * Math.sin(angle)]
}

/* Convert a polar coordinate into a cartesian coordinate
 *
 * Examples:
 * cartFromPolarDeg(5, 30)
 * cartFromPolarDeg([5, 30])
 */
export function cartFromPolarDeg(radius: number | number[], theta?: number) {
  let angle: number, rad: number
  if (Array.isArray(radius)) {
    angle = radius[1]
    rad = radius[0]
  } else if (theta === undefined) {
    let error = "theta was not defined. Either supply a second argument to the"
    error += " cartFromPolarDeg function or make the first argument an array"
    throw TypeError(error)
  } else {
    angle = theta
    rad = radius
  }

  return cartFromPolarRad(rad, (angle * Math.PI) / 180)
}

// Rotate vector
export function rotateRad(v: number[], theta: number) {
  var polar = polarRadFromCart(v)
  var angle = polar[1] + theta
  return cartFromPolarRad(polar[0], angle)
}

export function rotateDeg(v: number[], theta: number) {
  var polar = polarDegFromCart(v)
  var angle = polar[1] + theta
  return cartFromPolarDeg(polar[0], angle)
}

// Angle between two vectors
export function angleRad(v1: number[], v2: number[]) {
  return Math.acos(dot(v1, v2) / (length(v1) * length(v2)))
}

export function angleDeg(v1: number[], v2: number[]) {
  return (angleRad(v1, v2) * 180) / Math.PI
}

// Vector projection of v1 onto v2
export function projection(v1: number[], v2: number[]) {
  var scalar = dot(v1, v2) / dot(v2, v2)
  return scale(v2, scalar)
}

// Round each number to a certain number of decimal places
export function round(vec: number[], precision: number[] | number) {
  if (Array.isArray(precision)) {
    if (precision.length !== vec.length) {
      let error = "length of precision array must be same as vector you wish to"
      error +=
        " round. Either change the dimensions of the arrary or just supply a number."

      throw TypeError(error)
    } else {
      return vec.map((c, i) => knumber.round(c, precision[i]))
    }
  } else {
    return vec.map(c => knumber.round(c, precision))
  }
}

// Round each number to the nearest increment
export function roundTo(vec: number[], increment: number[] | number) {
  if (Array.isArray(increment)) {
    if (increment.length !== vec.length) {
      throw TypeError(
        "dimension of increment vector must same as vec. Either change the dimension or just supply a number."
      )
    } else {
      return vec.map((c, i) => knumber.roundTo(c, increment[i]))
    }
  } else {
    return vec.map(c => knumber.roundTo(c, increment))
  }
}

export function floorTo(vec: number[], increment: number[] | number) {
  if (Array.isArray(increment)) {
    if (increment.length !== vec.length) {
      throw TypeError(
        "dimension of increment vector must same as vec. Either change the dimension or just supply a number."
      )
    } else {
      return vec.map((c, i) => knumber.floorTo(c, increment[i]))
    }
  } else {
    return vec.map(c => knumber.floorTo(c, increment))
  }
}

export function ceilTo(vec: number[], increment: number[] | number) {
  if (Array.isArray(increment)) {
    if (increment.length !== vec.length) {
      throw TypeError(
        "dimension of increment vector must same as vec. Either change the dimension or just supply a number."
      )
    } else {
      return vec.map((c, i) => knumber.ceilTo(c, increment[i]))
    }
  } else {
    return vec.map(c => knumber.ceilTo(c, increment))
  }
}

export default {
  ceilTo,
  floorTo,
  roundTo,
  round,
  projection,
  angleDeg,
  angleRad,
  rotateDeg,
  rotateRad,
  cartFromPolarDeg,
  cartFromPolarRad,
  polarDegFromCart,
  polarRadFromCart,
  collinear,
  codirectional,
  equal,
  scale,
  negate,
  subtract,
  add,
  dot,
  length,
  normalize,
  is,
  arraySum,
}
