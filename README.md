kmath
=====

Javascript Numeric Math Utilities


Overview
--------

kmath is a collection of Javascript utility functions for performing
numeric (rather than algebraic) math that isn't built into Javascript,
especially geometric calculations.

For example, some computations are easy to express using vectors, but
difficult to express in terms of real numbers. kmath lets you write
vector, point, line, or ray- based math naturally.

kmath emphasizes simplicity and interoperability in the interfaces
provided. All kmath interfaces use standard Javascript types, usually
numbers, arrays of numbers, or arrays of arrays of numbers.


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

