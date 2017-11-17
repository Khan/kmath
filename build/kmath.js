(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("underscore"));
	else if(typeof define === 'function' && define.amd)
		define(["underscore"], factory);
	else if(typeof exports === 'object')
		exports["kmath"] = factory(require("underscore"));
	else
		root["kmath"] = factory(root["_"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Vector Utils 
 * A vector is an array of numbers e.g. [0, 3, 4].
 */

var _ = __webpack_require__(2);
var knumber = __webpack_require__(1);

function arraySum(array) {
    return _.reduce(array, function(memo, arg) { return memo + arg; }, 0);
}

function arrayProduct(array) {
    return _.reduce(array, function(memo, arg) { return memo * arg; }, 1);
}

var kvector = {

    is: function(vec, dimension) {
        if (!_.isArray(vec)) {
            return false;
        }
        if (dimension !== undefined && vec.length !== dimension) {
            return false;
        }
        return _.all(vec, knumber.is);
    },

    // Normalize to a unit vector
    normalize: function(v) {
        return kvector.scale(v, 1 / kvector.length(v));
    },

    // Length/magnitude of a vector
    length: function(v) {
        return Math.sqrt(kvector.dot(v, v));
    },

    // Dot product of two vectors
    dot: function(a, b) {
        var vecs = _.toArray(arguments);
        var zipped = _.zip.apply(_, vecs);
        var multiplied = _.map(zipped, arrayProduct);
        return arraySum(multiplied);
    },

    /* vector-add multiple [x, y] coords/vectors
     *
     * kvector.add([1, 2], [3, 4]) -> [4, 6]
     */
    add: function() {
        var points = _.toArray(arguments);
        var zipped = _.zip.apply(_, points);
        return _.map(zipped, arraySum);
    },

    subtract: function(v1, v2) {
        return _.map(_.zip(v1, v2), function(dim) {
            return dim[0] - dim[1];
        });
    },

    negate: function(v) {
        return _.map(v, function(x) {
            return -x;
        });
    },

    // Scale a vector
    scale: function(v1, scalar) {
        return _.map(v1, function(x) {
            return x * scalar;
        });
    },

    equal: function(v1, v2, tolerance) {
        // _.zip will nicely deal with the lengths, going through
        // the length of the longest vector. knumber.equal then
        // returns false for any number compared to the undefined
        // passed in if one of the vectors is shorter.
        return _.all(_.zip(v1, v2), function(pair) {
            return knumber.equal(pair[0], pair[1], tolerance);
        });
    },

    codirectional: function(v1, v2, tolerance) {
        // The origin is trivially codirectional with all other vectors.
        // This gives nice semantics for codirectionality between points when
        // comparing their difference vectors.
        if (knumber.equal(kvector.length(v1), 0, tolerance) ||
                knumber.equal(kvector.length(v2), 0, tolerance)) {
            return true;
        }

        v1 = kvector.normalize(v1);
        v2 = kvector.normalize(v2);

        return kvector.equal(v1, v2, tolerance);
    },

    collinear: function(v1, v2, tolerance) {
        return kvector.codirectional(v1, v2, tolerance) ||
                kvector.codirectional(v1, kvector.negate(v2), tolerance);
    },

    // Convert a cartesian coordinate into a radian polar coordinate
    polarRadFromCart: function(v) {
        var radius = kvector.length(v);
        var theta = Math.atan2(v[1], v[0]);

        // Convert angle range from [-pi, pi] to [0, 2pi]
        if (theta < 0) {
            theta += 2 * Math.PI;
        }

        return [radius, theta];
    },

    // Converts a cartesian coordinate into a degree polar coordinate
    polarDegFromCart: function(v) {
        var polar = kvector.polarRadFromCart(v);
        return [polar[0], polar[1] * 180 / Math.PI];
    },

    /* Convert a polar coordinate into a cartesian coordinate
     *
     * Examples:
     * cartFromPolarRad(5, Math.PI)
     * cartFromPolarRad([5, Math.PI])
     */
    cartFromPolarRad: function(radius, theta) {
        if (_.isUndefined(theta)) {
            theta = radius[1];
            radius = radius[0];
        }

        return [radius * Math.cos(theta), radius * Math.sin(theta)];
    },

    /* Convert a polar coordinate into a cartesian coordinate
     *
     * Examples:
     * cartFromPolarDeg(5, 30)
     * cartFromPolarDeg([5, 30])
     */
    cartFromPolarDeg: function(radius, theta) {
        if (_.isUndefined(theta)) {
            theta = radius[1];
            radius = radius[0];
        }

        return kvector.cartFromPolarRad(radius, theta * Math.PI / 180);
    },

    // Rotate vector
    rotateRad: function(v, theta) {
        var polar = kvector.polarRadFromCart(v);
        var angle = polar[1] + theta;
        return kvector.cartFromPolarRad(polar[0], angle);
    },

    rotateDeg: function(v, theta) {
        var polar = kvector.polarDegFromCart(v);
        var angle = polar[1] + theta;
        return kvector.cartFromPolarDeg(polar[0], angle);
    },

    // Angle between two vectors
    angleRad: function(v1, v2) {
        return Math.acos(kvector.dot(v1, v2) /
            (kvector.length(v1) * kvector.length(v2)));
    },

    angleDeg: function(v1, v2) {
        return kvector.angleRad(v1, v2) * 180 / Math.PI;
    },

    // Vector projection of v1 onto v2
    projection: function(v1, v2) {
        var scalar = kvector.dot(v1, v2) / kvector.dot(v2, v2);
        return kvector.scale(v2, scalar);
    },

    // Round each number to a certain number of decimal places
    round: function(vec, precision) {
        return _.map(vec, function(elem, i) {
            return knumber.round(elem, precision[i] || precision);
        });
    },

    // Round each number to the nearest increment
    roundTo: function(vec, increment) {
        return _.map(vec, function(elem, i) {
            return knumber.roundTo(elem, increment[i] || increment);
        });
    },

    floorTo: function(vec, increment) {
        return _.map(vec, function(elem, i) {
            return knumber.floorTo(elem, increment[i] || increment);
        });
    },

    ceilTo: function(vec, increment) {
        return _.map(vec, function(elem, i) {
            return knumber.ceilTo(elem, increment[i] || increment);
        });
    }
};

module.exports = kvector;



/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Number Utils
 * A number is a js-number, e.g. 5.12
 */

var _ = __webpack_require__(2);

var DEFAULT_TOLERANCE = 1e-9;
var EPSILON = Math.pow(2, -42);

var knumber = {

    DEFAULT_TOLERANCE: DEFAULT_TOLERANCE,
    EPSILON: EPSILON,

    is: function(x) {
        return _.isNumber(x) && !_.isNaN(x);
    },

    equal: function(x, y, tolerance) {
        // Checking for undefined makes this function behave nicely
        // with vectors of different lengths that are _.zip'd together
        if (x == null || y == null) {
            return x === y;
        }
        // We check === here so that +/-Infinity comparisons work correctly
        if (x === y) {
            return true;
        }
        if (tolerance == null) {
            tolerance = DEFAULT_TOLERANCE;
        }
        return Math.abs(x - y) < tolerance;
    },

    sign: function(x, tolerance) {
        return knumber.equal(x, 0, tolerance) ? 0 : Math.abs(x) / x;
    },

    isInteger: function(num, tolerance) {
        return knumber.equal(Math.round(num), num, tolerance);
    },


    // Round a number to a certain number of decimal places
    round: function(num, precision) {
        var factor = Math.pow(10, precision);
        return Math.round(num * factor) / factor;
    },

    // Round num to the nearest multiple of increment
    // i.e. roundTo(83, 5) -> 85
    roundTo: function(num, increment) {
        return Math.round(num / increment) * increment;
    },

    floorTo: function(num, increment) {
        return Math.floor(num / increment) * increment;
    },

    ceilTo: function(num, increment) {
        return Math.ceil(num / increment) * increment;
    },

    /**
     * toFraction
     *
     * Returns a [numerator, denominator] array rational representation
     * of `decimal`
     *
     * See http://en.wikipedia.org/wiki/Continued_fraction for implementation
     * details
     *
     * toFraction(4/8) => [1, 2]
     * toFraction(0.66) => [33, 50]
     * toFraction(0.66, 0.01) => [2/3]
     * toFraction(283 + 1/3) => [850, 3]
     */
    toFraction: function(decimal, tolerance, max_denominator) {
        max_denominator = max_denominator || 1000;
        tolerance = tolerance || EPSILON; // can't be 0

        // Initialize everything to compute successive terms of
        // continued-fraction approximations via recurrence relation
        var n = [1, 0], d = [0, 1];
        var a = Math.floor(decimal), t;
        var rem = decimal - a;

        while (d[0] <= max_denominator) {
            if (knumber.equal(n[0] / d[0], decimal, tolerance)) {
                return [n[0], d[0]];
            }
            n = [a*n[0] + n[1], n[0]];
            d = [a*d[0] + d[1], d[0]];
            a = Math.floor(1 / rem);
            rem = 1/rem - a;
        }

        // We failed to find a nice rational representation,
        // so return an irrational "fraction"
        return [decimal, 1];
    }
};

module.exports = knumber;



/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Point Utils
 * A point is an array of two numbers e.g. [0, 0].
 */

var _ = __webpack_require__(2);
var kvector = __webpack_require__(0);
var knumber = __webpack_require__(1);

var kpoint = {

    // Rotate point (around origin unless a center is specified)
    rotateRad: function(point, theta, center) {
        if (center === undefined) {
            return kvector.rotateRad(point, theta);
        } else {
            return kvector.add(
                center,
                kvector.rotateRad(
                    kvector.subtract(point, center),
                    theta
                )
            );
        }
    },

    rotateDeg: function(point, theta, center) {
        if (center === undefined) {
            return kvector.rotateDeg(point, theta);
        } else {
            return kvector.add(
                center,
                kvector.rotateDeg(
                    kvector.subtract(point, center),
                    theta
                )
            );
        }
    },

    // Distance between two points
    distanceToPoint: function(point1, point2) {
        return kvector.length(kvector.subtract(point1, point2));
    },

    // Distance between point and line
    distanceToLine: function(point, line) {
        var lv = kvector.subtract(line[1], line[0]);
        var pv = kvector.subtract(point, line[0]);
        var projectedPv = kvector.projection(pv, lv);
        var distancePv = kvector.subtract(projectedPv, pv);
        return kvector.length(distancePv);
    },

    // Reflect point over line
    reflectOverLine: function(point, line) {
        var lv = kvector.subtract(line[1], line[0]);
        var pv = kvector.subtract(point, line[0]);
        var projectedPv = kvector.projection(pv, lv);
        var reflectedPv = kvector.subtract(kvector.scale(projectedPv, 2), pv);
        return kvector.add(line[0], reflectedPv);
    },

    /**
     * Compares two points, returning -1, 0, or 1, for use with
     * Array.prototype.sort
     *
     * Note: This technically doesn't satisfy the total-ordering
     * requirements of Array.prototype.sort unless equalityTolerance
     * is 0. In some cases very close points that compare within a
     * few equalityTolerances could appear in the wrong order.
     */
    compare: function(point1, point2, equalityTolerance) {
        if (point1.length !== point2.length) {
            return point1.length - point2.length;
        }
        for (var i = 0; i < point1.length; i++) {
            if (!knumber.equal(point1[i], point2[i], equalityTolerance)) {
                return point1[i] - point2[i];
            }
        }
        return 0;
    }
};

_.extend(kpoint, {
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
    ceilTo: kvector.ceilTo
});

module.exports = kpoint;



/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    number: __webpack_require__(1),
    vector: __webpack_require__(0),
    point: __webpack_require__(3),
    line: __webpack_require__(5),
    ray: __webpack_require__(6),
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Line Utils
 * A line is an array of two points e.g. [[-5, 0], [5, 0]].
 */

var kpoint = __webpack_require__(3);
var kvector = __webpack_require__(0);

var kline = {

    distanceToPoint: function(line, point) {
        return kpoint.distanceToLine(point, line);
    },

    reflectPoint: function(line, point) {
        return kpoint.reflectOverLine(point, line);
    },

    midpoint: function(line) {
        return [
            (line[0][0] + line[1][0]) / 2,
            (line[0][1] + line[1][1]) / 2
        ];
    },

    equal: function(line1, line2, tolerance) {
        // TODO: A nicer implementation might just check collinearity of
        // vectors using underscore magick
        // Compare the directions of the lines
        var v1 = kvector.subtract(line1[1],line1[0]);
        var v2 = kvector.subtract(line2[1],line2[0]);
        if (!kvector.collinear(v1, v2, tolerance)) {
            return false;
        }
        // If the start point is the same for the two lines, then they are the same
        if (kpoint.equal(line1[0], line2[0])) {
            return true;
        }
        // Make sure that the direction to get from line1 to
        // line2 is the same as the direction of the lines
        var line1ToLine2Vector = kvector.subtract(line2[0], line1[0]);
        return kvector.collinear(v1, line1ToLine2Vector, tolerance);
    }
};

module.exports = kline;



/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/*
 * Ray Utils
 * A ray is an array of an endpoint and another point along the ray.
 * For example, [[0, 0], [1, 0]] is the ray starting at the origin and
 * traveling along the positive x-axis.
 */

var kvector = __webpack_require__(0);
var kpoint = __webpack_require__(3);

var kray = {

    equal: function(ray1, ray2, tolerance) {
        // Compare the directions of the rays
        var v1 = kvector.subtract(ray1[1],ray1[0]);
        var v2 = kvector.subtract(ray2[1],ray2[0]);

        var sameOrigin = kpoint.equal(ray1[0], ray2[0]);
        var codirectional = kvector.codirectional(v1, v2, tolerance);

        return sameOrigin && codirectional;
    }
};

module.exports = kray;



/***/ })
/******/ ]);
});