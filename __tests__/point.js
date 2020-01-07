import assert from "assert"
import kpoint from "../point"

describe("kpoint", function() {
  it("rotates a point pi/6 radians about the origin", () => {
    let point = [3, 0]
    let expected = [Math.sqrt(3) * 1.5, 1.5]
    let received = kpoint.rotateRad(point, Math.PI / 6)
    expect(expected[0]).toBeCloseTo(received[0])
    expect(expected[1]).toBeCloseTo(received[1])
  })
  it("rotates a point pi/6 radians about [1,1]", () => {
    let point = [3, 0]
    let expected = [(2 * Math.sqrt(3) + 3) / 2, (-Math.sqrt(3) + 4) / 2]
    let received = kpoint.rotateRad(point, Math.PI / 6, [1, 1])
    expect(expected[0]).toBeCloseTo(received[0])
    expect(expected[1]).toBeCloseTo(received[1])
  })
  it("rotates a point 30 degrees about the origin", () => {
    let point = [3, 0]
    let expected = [Math.sqrt(3) * 1.5, 1.5]
    let received = kpoint.rotateDeg(point, 30)
    expect(expected[0]).toBeCloseTo(received[0])
    expect(expected[1]).toBeCloseTo(received[1])
  })
  it("rotates a point 30 degrees about [1,1]", () => {
    let point = [3, 0]
    let expected = [(2 * Math.sqrt(3) + 3) / 2, (-Math.sqrt(3) + 4) / 2]
    let received = kpoint.rotateDeg(point, 30, [1, 1])
    expect(expected[0]).toBeCloseTo(received[0])
    expect(expected[1]).toBeCloseTo(received[1])
  })
  it("calculates distance from point1 to point2", () => {
    let point1 = [3, 0]
    let point2 = [0, 4]
    expect(kpoint.distanceToPoint(point1, point2)).toBe(5)
  })
  it("point.compare should return positive if the first element is larger", function() {
    var result = kpoint.compare([5, 2], [3, 4])
    assert.strictEqual(result > 0, true)
  })

  it("point.compare should return negative if the first element is smaller", function() {
    var result = kpoint.compare([2, 2], [4, 0])
    assert.strictEqual(result < 0, true)
  })

  it("point.compare should return positive if the second element is larger", function() {
    var result = kpoint.compare([5, 2], [5, 1])
    assert.strictEqual(result > 0, true)
  })

  it("point.compare should return negative if the second element is smaller", function() {
    var result = kpoint.compare([2, 2], [2, 4])
    assert.strictEqual(result < 0, true)
  })

  it("point.compare should return positive if the third element is larger", function() {
    var result = kpoint.compare([5, 3, -2], [5, 3, -4])
    assert.strictEqual(result > 0, true)
  })

  it("point.compare should return negative if the third element is smaller", function() {
    var result = kpoint.compare([2, -1, -4], [2, -1, -2])
    assert.strictEqual(result < 0, true)
  })

  it("point.compare should return 0 if the vectors are equal", function() {
    var result = kpoint.compare([2, 4, 3], [2, 4, 3])
    assert.strictEqual(result, 0)
  })

  it("point.compare should return negative if v1 is shorter than v2", function() {
    var result = kpoint.compare([2, 4], [2, 4, 3])
    assert.strictEqual(result < 0, true)
  })

  it("point.compare should return positive if v1 is longer than v2", function() {
    var result = kpoint.compare([2, 4, -2], [2, 2])
    assert.strictEqual(result > 0, true)
  })
})
