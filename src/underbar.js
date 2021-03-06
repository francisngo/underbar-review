(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (n > array.length) {
      return array;
    }
    return n === undefined ? array[array.length - 1] : array.slice(array.length - n, array.length);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (var i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else if (typeof collection === 'object') {
      for (var key in collection) {
        iterator(collection[key], key, collection);
      }
    }

  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target) {
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var items = [];
    _.each(collection, function(item) {
      if (test(item)) {
        items.push(item);
      }
    });
    return items;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(item) {
      return !test(item);
    });
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array, isSorted, iterator) {
    // var unique = [];
    // _.each(array, function(item) {
    //   if (_.indexOf(unique, item) === -1) {
    //     unique.push(item);
    //   }
    // });
    // return unique;

    var hash = {};
    var unique = [];
    iterator = (isSorted && iterator) || _.identity;

    _.each(array, function(item) {
      var transformed = iterator(item);
      if (hash[transformed] === undefined) {
        hash[transformed] = item;
      }
    });
    _.each(hash, function(value) {
      unique.push(value);
    });
    return unique;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.

    var result = [];
    _.each(collection, function(item) {
      result.push(iterator(item));
    });
    return result;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item) {
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    // check for accumulator
    var noAccumulator = arguments.length === 2;

    // iterate through collection
    _.each(collection, function(item) {
      // if accumulator does not exist
      if (noAccumulator) {
        // set accumulator to false
        noAccumulator = false;
        // set first item of collection as accumulator
        accumulator = item;
      } else {
        // set accumulator to result of iterator function with accumulator and item applied
        accumulator = iterator(accumulator, item);
      }
    });
    // return accumulator
    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    // provide default iterator if not given one
    iterator = iterator || _.identity;

    // // with _.each
    // // start with a truthy variable
    // var allElementMatch = true;
    // // iterate through collection, for each item,
    // _.each(collection, function(item) {
    //   // assign truthy to itself and the Boolean value of item after iterator
    //   allElementMatch = allElementMatch && Boolean(iterator(item));
    // });
    // // truthy variable has to match; if it doesn't return false, if it does return true;
    // // example: allElementMatch (true) && Boolean(iterator(item)) (false) === false
    // // example: allElementMatch (true) && Boolean(iterator(item)) (true) === true
    // return allElementMatch;

    // with _.reduce
    return _.reduce(collection, function(isTrue, item) {
      return isTrue && Boolean(iterator(item));
    }, true);

  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.

    iterator = iterator || _.identity;

    return !_.every(collection, function(item) {
      return !iterator(item);
    });
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    // accepts x amount of args
    // ES2015: Array.from(arguments) will grab all the args
    // Array.prototype.slice.call(arguments) also grabs all the args but we want to skip first one
    // use Array.prototype.slice.call(arguments, 1) to slice off first arg

    /*
    function collectArgs(obj1, obj2, obj3, obj4) {
      var args = Array.prototype.slice.call(arguments);
      return args;
    }
    collectArgs(1, 2, 3, 4); => [1, 2, 3, 4]

    function collectArgs(obj1) {
      var args = Array.prototype.slice.call(arguments, 1);
      return args;
    }
    collectArgs(1, 2, 3, 4); => [2, 3, 4]
    */

    var args = Array.prototype.slice.call(arguments, 1);
    _.each(args, function(object) {
      _.each(object, function(prop, key) {
        obj[key] = prop;
      });
    });
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    var args = Array.prototype.slice.call(arguments, 1);
    _.each(args, function(object) {
      _.each(object, function(prop, key) {
        if (!obj.hasOwnProperty(key)) {
          obj[key] = prop;
        }
      });
    });
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };

    /*
    w/ ES6 arrow functions
    const once = (func) => {
      let alreadyCalled = false;
      let result;
      return (...args) => !alreadyCalled ? (alreadyCalled = true, result = func(...args)) : result;
    }
    */
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    let memo = {};
    return function() {
      let serialization = JSON.stringify(arguments);
      /*
      memo = {
        {"0": 1, "1": 2} : 3,
        {"0": 3, "1": 4} : 7
      };
      */
      return memo[serialization] = memo[serialization] || func.apply(this, arguments);
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments, 2);
    setTimeout(function() {
      return func.apply(null, args);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice

  // idea is to use the back of the array to store the shuffled elements, and the front of the array to store the remaining elements. pick random remaining element (from the front) and place in its new location (in the back). The unshuffled element in the back gets swapped to the front where it waits for subsequent shuffling.

  // https://bost.ocks.org/mike/shuffle/

  _.shuffle = function(array) {
    // make a copy of the given array
    var sorted = array.slice();
    // retrieve the length of new array
    var remaining = sorted.length;
    // create the temp and current variable to hold elements while swapping
    var temp, current;
    // while the remaining is left
    while (remaining) {
      // assign current to a random element
      // decrement each time current gets reassigned to a random element
      // swap the last element with the current element
      current = Math.floor(Math.random() * remaining--);
      temp = sorted[remaining];
      sorted[remaining] = sorted[current];
      sorted[current] = temp;
    }
    return sorted;
  };


  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.

  // MDN => The apply() method calls a function with a given this value, and arguments provided as an array(or an array-like object).
  _.invoke = function(collection, functionOrKey) {
    return _.map(collection, function(item) {
      // if typeof functionOrKey is a string then item[functionOrKey]
      // otherwise use functionOrKey
      var method = typeof functionOrKey === 'string' ? item[functionOrKey] : functionOrKey;
      // apply the method to the item
      return method.apply(item);
    });
  };

  /*
    _.invoke(['dog', 'cat'], 'toUpperCase'); => ['DOG', 'CAT']
    'toUpperCase' is a string so 'dog'['toUpperCase']
    so, var method = 'dog'['toUpperCase'] or 'dog'.toUpperCase
    then, return method.apply(item) which is 'dog'.toUpperCase.apply('dog') => 'DOG'
  */

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    // NOTE: iterator is a string, check to see if string
    // assign string iterator to a variable to use later
    // assign the given iterator to a function that accepts an item

    // check to see if iterator is a string
    // retrieve the iterator
    // assign the iterator a function that accepts the item
    // return the item's iterator property
    // sort the collection using the iterator in ascending order

    if (typeof iterator === 'string') {
      var iter = iterator;
      iterator = function(item) {
        return item[iter];
      };
    }

    return collection.sort(function(a, b) {
      return iterator(a) - iterator(b);
    });
  };

  /*
    var people = [{name: 'curly', age: 50}, {name: 'moe', age: 30}];
    var sortedByAge = _.sortBy(people, function(person) {
      return person.age;
    });

  */

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var max = 0;
    var result = new Array(max);

    _.each(arguments, function(arg) {
      max = Math.max(arg.length, max);
    });

    for (var i = 0; i < max; i++) {
      result[i] = _.pluck(arguments, i);
    }

    return result;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
