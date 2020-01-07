/*
 * Ray Utils
 * A ray is an array of an endpoint and another point along the ray.
 * For example, [[0, 0], [1, 0]] is the ray starting at the origin and
 * traveling along the positive x-axis.
 */

import kvector from "./vector"
import kpoint from "./point"
import { DEFAULT_TOLERANCE } from "./number"

function equal(
  ray1: number[][],
  ray2: number[][],
  tolerance = DEFAULT_TOLERANCE
) {
  // Compare the directions of the rays
  var v1 = kvector.subtract(ray1[1], ray1[0])
  var v2 = kvector.subtract(ray2[1], ray2[0])

  var sameOrigin = kpoint.equal(ray1[0], ray2[0])
  var codirectional = kvector.codirectional(v1, v2, tolerance)

  return sameOrigin && codirectional
}

export default { equal }
