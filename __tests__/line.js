import assert from "assert"
import kline from "../line"

describe("kline", function() {
  it("finds distance to point", () => {
    let line = [
      [-5, 0],
      [5, 0],
    ]
    let point = [0, 5]
    expect(kline.distanceToPoint(line, point)).toBe(5)
  })

  it("reflects a point", () => {
    let line = [
      [-5, -5],
      [5, 5],
    ]
    let point = [0, 5]
    expect(kline.reflectPoint(line, point)).toEqual([5, 0])
  })

  it("finds the midpoint", () => {
    let line = [
      [-5, -5],
      [5, 5],
    ]
    expect(kline.midpoint(line)).toEqual([0, 0])
  })

  it("finds the positive slope", () => {
    let line = [
      [-5, -5],
      [5, 5],
    ]
    expect(kline.slope(line)).toEqual(1)
  })
  it("finds the negative slope", () => {
    let line = [
      [-5, 5],
      [5, -5],
    ]
    expect(kline.slope(line)).toEqual(-1)
  })
  it("finds the intercept", () => {
    let line = [
      [2, 5],
      [-6, -3],
    ]
    expect(kline.intercepts(line)).toEqual([-3, 3])
  })
  it("two identical lines should be equal", function() {
    var result = kline.equal(
      [
        [1, 1],
        [3, 3],
      ],
      [
        [1, 1],
        [3, 3],
      ]
    )
    assert.strictEqual(result, true)
  })

  it("two parallel lines should not be equal", function() {
    var result = kline.equal(
      [
        [1, 1],
        [3, 3],
      ],
      [
        [1, 2],
        [3, 4],
      ]
    )
    assert.strictEqual(result, false)
  })

  it("two intersecting lines should not be equal", function() {
    var result = kline.equal(
      [
        [1, 1],
        [3, 3],
      ],
      [
        [1, 1],
        [3, 4],
      ]
    )
    assert.strictEqual(result, false)
  })

  it("two collinear lines should be equal #1", function() {
    var result = kline.equal(
      [
        [1, 1],
        [3, 3],
      ],
      [
        [0, 0],
        [5, 5],
      ]
    )
    assert.strictEqual(result, true)
  })

  it("two collinear lines should be equal #2", function() {
    var result = kline.equal(
      [
        [4, 4],
        [5, 5],
      ],
      [
        [0, 0],
        [1, 1],
      ]
    )
    assert.strictEqual(result, true)
  })

  it("two collinear lines should be equal #3", function() {
    var result = kline.equal(
      [
        [0, 0],
        [1, 1],
      ],
      [
        [3, 3],
        [6, 6],
      ]
    )
    assert.strictEqual(result, true)
  })

  it("gets values of line in slope-intercept form", () => {
    expect(
      kline.getSlopeIntercept([
        [1, 6],
        [-2, -3],
      ])
    ).toEqual([3, 3])
  })

  it("gets values of line in standard form", () => {
    expect(
      kline.getStandardLine([
        [-1, 6],
        [2, -3],
      ])
    ).toEqual([3, 1, 3])
    expect(
      kline.getStandardLine([
        [-3.1, -1.9],
        [0.5, 0.5],
      ])
    ).toEqual([4, -6, -1])
  })
})
