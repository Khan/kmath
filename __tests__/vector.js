import assert from "assert"
import vector from "../vector"

describe("kvector", function() {
  it("is a vector", () => {
    expect(vector.is([1, 1])).toBe(true)
  })
  it("is not a vector", () => {
    expect(vector.is("[1, 1]")).toBe(false)
    expect(vector.is({ 1: 3, 2: 4 })).toBe(false)
    expect(vector.is([1, "3"])).toBe(false)
  })
  it("correctly uses the supplied dimension", () => {
    expect(vector.is([1, 1, 1], 3)).toBe(true)
    expect(vector.is([1, 1, 1], 2)).toBe(false)
  })
  it("vector.add should add two 2D vectors", function() {
    var result = vector.add([1, 2], [3, 4])
    assert.deepEqual(result, [4, 6])
  })
  it("vector.add should add two 3D vectors", function() {
    var result = vector.add([1, 2, 3], [4, 5, 6])
    assert.deepEqual(result, [5, 7, 9])
  })

  it("vector.add should add three 2D vectors", function() {
    var result = vector.add([1, 2], [3, 4], [5, 6])
    assert.deepEqual(result, [9, 12])
  })

  it("should throw error when adding vectors of different dimensions", () => {
    expect.assertions(2)
    try {
      vector.add([1, 2, 3], [6, 7])
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError)
      expect(error).toHaveProperty(
        "message",
        "vectors must be same dimension to add"
      )
    }
  })
  it("vector.subtract should subtract two 2D vectors", function() {
    var result = vector.subtract([1, 2], [3, 4])
    assert.deepEqual(result, [-2, -2])
  })

  it("vector.subtract should subtract two 3D vectors", function() {
    var result = vector.subtract([1, 2, 3], [4, 5, 6])
    assert.deepEqual(result, [-3, -3, -3])
  })
  it("should throw error when subtracting vectors of different dimensions", () => {
    expect.assertions(2)
    try {
      vector.subtract([1, 2, 3], [6, 7])
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError)
      expect(error).toHaveProperty(
        "message",
        "vectors must be same dimension to subtract"
      )
    }
  })

  it("vector.dot should take the dot product of 2 2D vectors", function() {
    var result = vector.dot([1, 2], [3, 4])
    assert.strictEqual(result, 3 + 8)
  })

  it("vector.dot should take the dot product of 2 3D vectors", function() {
    var result = vector.dot([1, 2, 3], [4, 5, 6])
    assert.strictEqual(result, 4 + 10 + 18)
  })

  it("should throw error when taking dot product of vectors not of same dimension", () => {
    expect.assertions(2)
    try {
      vector.dot([1, 2, 3], [6, 7])
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError)
      expect(error).toHaveProperty(
        "message",
        "Vectors must be same dimension to perform dot product"
      )
    }
  })
  it("vector.scale should scale a 2D vector", function() {
    var result = vector.scale([4, 2], 0.5)
    assert.deepEqual(result, [2, 1])
  })

  it("vector.scale should scale a 3D vector", function() {
    var result = vector.scale([1, 2, 3], 2)
    assert.deepEqual(result, [2, 4, 6])
  })

  it("vector.length should take the length of a 2D vector", function() {
    var result = vector.length([3, 4])
    assert.strictEqual(result, 5)
  })

  it("vector.length should take the length of a 3D vector", function() {
    var result = vector.length([4, 0, 3])
    assert.strictEqual(result, 5)
  })

  it("vector.equal should return true on two equal 3D vectors", function() {
    var result = vector.equal([6, 3, 4], [6, 3, 4])
    assert.strictEqual(result, true)
  })

  it("vector.equal should return false on two inequal 3D vectors", function() {
    var result = vector.equal([6, 3, 4], [6, 4, 4])
    assert.strictEqual(result, false)
  })

  it("vector.equal should return false on a 2D and 3D vector", function() {
    var result = vector.equal([6, 4], [6, 4, 4])
    assert.strictEqual(result, false)
  })

  it("vector.equal should return false on a 2D and 3D vector", function() {
    var result = vector.equal([6, 3, 4], [6, 3])
    assert.strictEqual(result, false)
  })

  it("vector.equal should return false on a 2D and 3D vector with a trailing 0", function() {
    var result = vector.equal([6, 3, 0], [6, 3])
    assert.strictEqual(result, false)
  })

  it(
    "vector.collinear should return true on two collinear vectors of " +
      "the same magnitude but different direction",
    function() {
      var result = vector.collinear([3, 3], [-3, -3])
      assert.strictEqual(result, true)
    }
  )

  it(
    "vector.collinear should return true on two collinear vectors of " +
      "different magnitudes",
    function() {
      var result = vector.collinear([2, 1], [6, 3])
      assert.strictEqual(result, true)
    }
  )

  it("vector.collinear should return false on non-collinear vectors", function() {
    var result = vector.collinear([1, 2], [-1, 2])
    assert.strictEqual(result, false)
  })

  it("vector.negate of [-2, 2] is [2, -2]", function() {
    var result = vector.negate([-2, 2])
    assert.deepEqual(result, [2, -2])
  })

  it("vector.codirectional is true for 0-vector", () => {
    expect(vector.codirectional([5, 0], [])).toBe(true)
  })

  it("vector.cartFromPolarRad can use array as first argument", () => {
    expect(vector.cartFromPolarRad([5, Math.PI])).toEqual(
      vector.cartFromPolarRad(5, Math.PI)
    )
  })
  it("vector.cartFromPolarRad should throw error if first argument is not array and theta not supplied", () => {
    expect.assertions(2)
    try {
      vector.cartFromPolarRad(5)
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError)
      expect(error).toHaveProperty(
        "message",
        "theta was not defined. Either supply a second argument to the cartFromPolarRad function or make the first argument an array"
      )
    }
  })

  it("vector.cartFromPolarDeg can use array as first argument", () => {
    expect(vector.cartFromPolarDeg([5, 90])).toEqual(
      vector.cartFromPolarDeg(5, 90)
    )
  })
  it("vector.cartFromPolarDeg should throw error if first argument is not array and theta not supplied", () => {
    expect.assertions(2)
    try {
      vector.cartFromPolarDeg(5)
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError)
      expect(error).toHaveProperty(
        "message",
        "theta was not defined. Either supply a second argument to the cartFromPolarDeg function or make the first argument an array"
      )
    }
  })
  it("vector.angleRad gives angle between two vectors", () => {
    expect(vector.angleRad([1, 0], [-Math.sqrt(3) / 2, 0.5])).toBeCloseTo(
      (5 * Math.PI) / 6
    )
  })
  it("vector.angleDeg gives angle between two vectors", () => {
    expect(vector.angleDeg([1, 0], [-Math.sqrt(3) / 2, 0.5])).toBeCloseTo(150)
  })

  it("vector.round rounds each number to a scaled precision", () => {
    expect(vector.round([0.09876, 0.57894], 2)).toEqual([0.1, 0.58])
  })
  it("vector.round rounds each number to a individual precision", () => {
    expect(vector.round([0.09876, 0.57894], [3, 2])).toEqual([0.099, 0.58])
  })
  it("vector.round throws if precision vector different dimension", () => {
    expect.assertions(2)
    try {
      vector.round([0.09876, 0.57894], [2])
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError)
      expect(error).toHaveProperty(
        "message",
        "length of precision array must be same as vector you wish to round. Either change the dimensions of the arrary or just supply a number."
      )
    }
  })
  it("vector.roundTo rounds each component to nearest increment", () => {
    expect(vector.roundTo([83, 11, 15], 5)).toEqual([85, 10, 15])
  })
  it("vector.roundTo rounds each component to individual increment", () => {
    expect(vector.roundTo([83, 11, 0.15], [5, 12, 0.25])).toEqual([
      85,
      12,
      0.25,
    ])
  })
  it("vector.roundTo throws if increment vector different dimension", () => {
    expect.assertions(2)
    try {
      vector.roundTo([83, 11, 0.15], [2])
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError)
      expect(error).toHaveProperty(
        "message",
        "dimension of increment vector must same as vec. Either change the dimension or just supply a number."
      )
    }
  })
  it("vector.floorTo rounds each component to nearest increment", () => {
    expect(vector.floorTo([83, 11, 15], 5)).toEqual([80, 10, 15])
  })
  it("vector.floorTo rounds each component to individual increment", () => {
    expect(vector.floorTo([83, 11, 0.15], [5, 12, 0.25])).toEqual([80, 0, 0])
  })
  it("vector.floorTo throws if increment vector different dimension", () => {
    expect.assertions(2)
    try {
      vector.floorTo([83, 11, 0.15], [2])
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError)
      expect(error).toHaveProperty(
        "message",
        "dimension of increment vector must same as vec. Either change the dimension or just supply a number."
      )
    }
  })
  it("vector.ceilTo rounds each component to nearest increment", () => {
    expect(vector.ceilTo([83, 11, 15], 5)).toEqual([85, 15, 15])
  })
  it("vector.ceilTo rounds each component to individual increment", () => {
    expect(vector.ceilTo([83, 11, 0.1], [5, 12, 0.25])).toEqual([85, 12, 0.25])
  })
  it("vector.ceilTo throws if increment vector different dimension", () => {
    expect.assertions(2)
    try {
      vector.ceilTo([83, 11, 0.15], [2])
    } catch (error) {
      expect(error).toBeInstanceOf(TypeError)
      expect(error).toHaveProperty(
        "message",
        "dimension of increment vector must same as vec. Either change the dimension or just supply a number."
      )
    }
  })
})
