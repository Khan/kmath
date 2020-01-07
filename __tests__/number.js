import assert from "assert"
import number from "../number"

describe("knumber", function() {
  it("is a number", () => {
    let result = number.is(3)
    assert.strictEqual(result, true)
    result = number.is(Math.PI)
    assert.strictEqual(result, true)
    result = number.is(6.28)
    assert.strictEqual(result, true)
    result = number.is(5e10)
    assert.strictEqual(result, true)
    result = number.is(1 / 0)
    assert.strictEqual(result, true)
  })
  it("is not a number", () => {
    let result = number.is("10")
    assert.strictEqual(result, false)
    result = number.is(0 / 0)
    assert.strictEqual(result, false)
    result = number.is(NaN)
    assert.strictEqual(result, false)
  })
  it("two equal numbers should be equal", function() {
    var result = number.equal(1 / 3, (1 / 90) * 30)
    assert.strictEqual(result, true)
  })

  it("two different numbers should not be equal", function() {
    var result = number.equal(1 / 3, 1.333333)
    assert.strictEqual(result, false)
  })

  it("Infinity should equal Infinity", function() {
    var result = number.equal(
      Number.POSITIVE_INFINITY,
      Number.POSITIVE_INFINITY
    )
    assert.strictEqual(result, true)
  })

  it("+Infinity should not equal -Infinity", function() {
    var result = number.equal(
      Number.POSITIVE_INFINITY,
      Number.NEGATIVE_INFINITY
    )
    assert.strictEqual(result, false)
  })

  it("sign(0) should be 0", function() {
    assert.strictEqual(number.sign(0), 0)
  })

  it("sign(-0.0) should be 0", function() {
    assert.strictEqual(number.sign(-0.0), 0)
  })

  it("sign(3.2) should be 1", function() {
    assert.strictEqual(number.sign(3.2), 1)
  })

  it("sign(-2.8) should be -1", function() {
    assert.strictEqual(number.sign(-2.8), -1)
  })

  it("isInteger(-2.8) should be false", function() {
    assert.strictEqual(number.isInteger(-2.8), false)
  })

  it("isInteger(-2) should be true", function() {
    assert.strictEqual(number.isInteger(-2), true)
  })

  it("isInteger(10.0) should be true", () => {
    assert.strictEqual(number.isInteger(10), true)
  })

  it("rounds to correct precision", () => {
    assert.strictEqual(number.round(0.06793, 4), 0.0679)
    assert.strictEqual(number.round(0.06793, 3), 0.068)
  })

  it("rounds to correct interval", () => {
    assert.strictEqual(number.roundTo(83, 5), 85)
    assert.strictEqual(number.roundTo(2.3, 0.5), 2.5)
  })

  it("floors to the correct interval", () => {
    assert.strictEqual(number.floorTo(83, 5), 80)
    assert.strictEqual(number.floorTo(2.3, 0.5), 2)
  })

  it("ceils to the correct interval", () => {
    assert.strictEqual(number.ceilTo(81, 5), 85)
    assert.strictEqual(number.ceilTo(2.1, 0.5), 2.5)
  })

  it("toFraction(-2) should be -2/1", function() {
    assert.deepEqual(number.toFraction(-2), [-2, 1])
  })

  it("toFraction(-2.5) should be -5/2", function() {
    assert.deepEqual(number.toFraction(-2.5), [-5, 2])
  })

  it("toFraction(2/3) should be 2/3", function() {
    assert.deepEqual(number.toFraction(2 / 3), [2, 3])
  })

  it("toFraction(283.33...) should be 850/3", function() {
    assert.deepEqual(number.toFraction(283 + 1 / 3), [850, 3])
  })

  it("toFraction(0) should be 0/1", function() {
    assert.deepEqual(number.toFraction(0), [0, 1])
  })

  it("toFraction(pi) should be pi/1", function() {
    assert.deepEqual(number.toFraction(Math.PI), [Math.PI, 1])
  })

  it("toFraction(0.66) should be 33/50", function() {
    assert.deepEqual(number.toFraction(0.66), [33, 50])
  })

  it("toFraction(0.66, 0.01) should be 2/3", function() {
    assert.deepEqual(number.toFraction(0.66, 0.01), [2, 3])
  })
})
