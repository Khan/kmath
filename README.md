kmath
=====

Javascript Numeric Math Utilities


Overview
--------

kmath is a collection of Javascript utility functions for performing
numeric (rather than algebraic) math that isn't built into Javascript,
especially geometric calculations.

For example, some computations are easy to express using vectors, but
difficult to express in terms of raw real number variables. kmath lets
you write vector-, point-, line-, or ray-based math naturally, and
also has some real number utility methods that might be useful if
you're writing a math-heavy Javascript application.

kmath emphasizes simplicity and interoperability in the interfaces
provided. All kmath interfaces use standard Javascript types, usually
numbers, arrays of numbers, or arrays of arrays of numbers. This means
interoping with other systems (other libraries, or sending kmath types
over json) is easy, but kmath doesn't have it's own object-oriented
types, which may be inconvenient (for example, in debugging, you'll
just see Arrays rather than, for example, Vectors).

kmath also focuses on being a high quality library of a few functions,
rather than a large library of many functions which are less unified.

kmath emphasizes simplicity in design over performance, when those two
are at odds. If you are writing code in an inner loop in an allocation-
sensitive environment, kmath might not be for you. Each method is
pure and allocates a new array for the return value.

Getting started
---------------

After cloning or downloading kmath, you can install it by running
`npm install` or `make install`.

To play around with the available interfaces, you can load kmath
into a Node repl:

    $ node
    > var kmath = require("kmath");
    > kmath.vector.add([1, 2], [3, 4])
    [4, 6]

Overview
--------

kmath has 5 basic types:

 * number
 * vector
 * point
 * ray
 * line

Each has its own representation:

 * number: a js number (i.e. `5`)
 * vector: a js array of numbers (i.e. `[5, 6]`)
 * point: a js array of numbers (i.e. `[5, 6]`)
 * ray: a js array of two points (i.e. `[[5, 6], [1, 2]]`)
 * line: a js array of two points (i.e. `[[5, 6], [1, 2]]`)

kmath functions usually take an argument of the corresponding type as
the first parameter, and other parameters afterwards. For example, to
rotate the point `[1, 1]` by 90 degrees around `[0, 0]`, one might use:

    kmath.point.rotateDeg([1, 1], 90, [0, 0])

Documentation for specific functions for each type is provided below.

kmath.number
------------

#### `number.DEFAULT_TOLERANCE === 1e-9`

The default tolerance to kmath functions.

#### `number.EPSILON === Math.pow(2, -42)`

A small number. Not machine epsilon, but a reasonable amount of error
more than generally accrued by doing repeated floating point math.

#### `number.is(maybeANumber)`

Returns true if the argument is a javascript number.

#### `number.equal(number1, number2, [tolerance])`

Compares whether number1 and number2 are equal to each other, within
a difference of tolerance, which defaults to `number.DEFAULT_TOLERANCE`.

#### `number.sign(aNumber, [tolerance])`

Returns 0 if the number is equal to 0 within `tolerance`, or -1 if the
number is less than 0, or 1 if the number is greater than 0.

#### `number.isInteger(aNumber, tolerance)`

Returns true if `aNumber` is within `tolerance` difference of an integer.
`tolerance` defaults to `number.DEFAULT_TOLERANCE`.

#### `number.round(aNumber, precision)`

Rounds `aNumber` to `precision` decimal places.

#### `number.roundTo(aNumber, increment)`

Rounds `aNumber` to the nearest `increment`.

For example, `number.roundTo(1.4, 0.5)` would return `1.5`

#### `number.floorTo(aNumber, increment)`

Returns the nearest multiple of `increment` that is no greater than
`aNumber`.

#### `number.ciel(aNumber, increment)`

Returns the nearest multiple of `increment` that is no smaller than
`aNumber`.

#### `number.toFraction(decimal, [tolerance], [maxDenominator])`

Returns an array containing two elements, `[n, d]`, a numerator and
denominator representing a fraction `n/d` that is within `tolerance`
of `decimal`.

If no fraction with a denominator less than or equal to `maxDenominator`
is found, `[decimal, 1]` is returned.

`tolerance` defaults to `number.EPSILON`. `maxDenominator` defaults to
`1000`.

License
-------

MIT. See the LICENSE file for more information.

