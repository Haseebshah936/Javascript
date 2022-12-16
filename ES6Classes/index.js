// * Classes are synthetic suger over constructor functions
// * Classes are not hoisted
// * Classes are by default in strict mode
// ! ("use strict"); is used to enable strict mode

// * Hoisting
// * Hoisting is a JavaScript mechanism function declarations are moved to the top of their scope before code execution.
// * Hoisting is not possible with expression declarations of functions and variables.

const b = a; // a is hoisted
function a() {
  return "a";
}

// const c = d; // d is not hoisted throws error
// const d = () => { // expression declaration not hoisted
//   return "d";
// };

// * Strict Mode
// * Strict mode is a way to opt in to a restricted variant of JavaScript, thereby implicitly opting-out of "sloppy mode".
// * Strict mode makes several changes to normal JavaScript semantics. First, strict mode eliminates some JavaScript silent errors by changing them to throw errors. Second, strict mode fixes mistakes that make it difficult for JavaScript engines to perform optimizations: strict mode code can sometimes be made to run faster than identical code that's not strict mode.
// * Strict changes the scope of this to be undefined in the global scope and in functions that are not called as methods of an object.

// ! Example of this in strict mode and non strict mode in functions uncomment to see the difference
// const Circle = function () {
//   this.draw = function () {
//     console.log(this);
//   };
// };

// const c = new Circle();
// c.draw(); // return circle Object
// const draw = c.draw;
// draw(); // return window object in non strict mode and undefined in strict mode

// * ES6 Classes

// * Class Declaration Example
class Circle {
  constructor(radius) {
    // properties are added to the instance of the class (object)
    this.radius = radius;
    this.move = function () {
      // add methods to the instance of the class (object)
      console.log("move");
    };
  }
  draw() {
    // add methods to the prototype
    console.log("draw");
  }
  static parse(str) {
    // add static methods to the class
    const radius = JSON.parse(str).radius;
    return new Circle(radius);
  }
}

const c = new Circle(1);
const c1 = Circle.parse('{"radius": 1}'); // static method

// * Class Expression Example

// * To make a property private we can use symbols or weakmaps

const _color = Symbol(); // private property using symbols it return a unique value
const _name = new WeakMap(); // private property using weakmaps
const Square = class {
  constructor(side, color = "red", name = "Square") {
    this.side = side;
    // let _name = new WeakMap(); // private property using weakmaps initialize in the constructor
    this[_color] = color; // private property
    _name.set(this, name); // private property using weakmaps
    // ! The below code is to initialize the get and set methods for the private property _name if it is initalized using the weakmaps in the constructor
    // Object.defineProperty(this, "_name", {
    //   get: function () {
    //     return _name.get(this); // private property using weakmaps
    //   },
    //   set: function (value) {
    //     _name.set(this, value); // private property using weakmaps
    //   },
    // });
  }
  draw() {
    console.log("draw");
  }
  getColor() {
    return this[_color]; // private property
  }

  // getter for _name initialized outside the class
  get _name() {
    // getter for name
    return _name.get(this); // private property using weakmaps
  }
  // setter for _name initialized outside the class
  set _name(value) {
    _name.set(this, value); // private property using weakmaps
  }
};

const s = new Square(1, "blue", "Square");
const p = Object.getOwnPropertySymbols(s)[0]; // return arrays of symbols in the object that are private. We are here getting the first symbol in the array which is the private property color
s[p] = "green"; // change private property color value
const color = s[p]; // returns private property color value i
console.log(color);

for (let key in s) console.log(key); // returns only side property

// ! Using Symbols to make private properties is not a good idea because we can still access the private properties using the getOwnPropertySymbols method and we can also change the value of the private properties using the same method. Although we can't access the private property directly using the dot notation.

// ! Using WeakMaps to make private properties is a good idea because we can't access the private properties using the getOwnPropertySymbols method and we can't change the value of the private properties using the same method. Although we can't access the private property directly using the dot notation. We can only access the private properties using the getter and setter methods.

// * Inheritance in ES6 Classes must have one constructor and one super call

class Car {
  constructor(color, price, owner) {
    this.color = color;
    this.price = price;
    let _owner = new WeakMap(); // private property using weakmaps
    _owner.set(this, owner);
    Object.defineProperty(this, "_owner", {
      get: function () {
        return _owner.get(this); // private property using weakmaps
      },
      set: function (value) {
        _owner.set(this, value); // private property using weakmaps
      },
    });
  }

  start() {
    console.log("start");
  }
  stop() {
    console.log("stop");
  }
}

class Toyota extends Car {
  headlight = 2; // add properties to the instance of the class (object)
  constructor(color, price, owner, model) {
    super(color, price, owner); // call the parent constructor
    this.model = model;
  }
  honk() {
    console.log("honk");
  }
  // * Method Overriding
  stop() {
    // super.stop(); // call the parent method
    console.log("stop in Toyota");
  }
}

const t = new Toyota("red", 1000, "Haseeb", "Camry");

// Exercise 1 - Stack
let _count = new WeakMap();
let _stack = new WeakMap();
class Stack {
  constructor() {
    _count.set(this, 0);
    _stack.set(this, []);
  }
  get _count() {
    return _count.get(this);
  }
  push(item) {
    const stack = _stack.get(this);
    stack.push(item);
    _stack.set(this, stack);
    _count.set(this, _count.get(this) + 1);
  }
  pop() {
    const stack = _stack.get(this);
    if (stack.length <= 0) throw new Error("Stack is empty");
    const item = stack.pop();
    _stack.set(this, stack);
    _count.set(this, _count.get(this) - 1);
    return item;
  }
  peek() {
    const stack = _stack.get(this);
    if (stack.length <= 0) throw new Error("Stack is empty");
    const item = stack[stack.length - 1];
    return item;
  }
}

const stack = new Stack();
