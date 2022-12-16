// console.log("Objects");
// !NOTE in javascript we don't have classes MOSH
// There are three different methods to define ann object

// 1- Objects literal syntex

const circleL = {
  radius: 4, // properties
  location: {
    x: 1,
    y: 1,
  },
  draw: () => {
    // functions
    console.log("Object literal Draw a circle");
  },
};

circleL.draw();
// Object literal is not good if there is at least one function
// and the object needs to be duplicated multiple times in case if any change
// occure in the defination of the function we have to change it every where
// So we use factory method to initialize objects with behaviour. If an object
// have one or more methods we say that this object have behaviour.

// 2- Factory Function

const createCircle = (radius) => {
  return {
    radius,
    draw: () => {
      console.log("Factory way draw circle with radius", radius);
    },
  };
};

const circleF = createCircle(1);

circleF.draw();

// 3- Constructor
// Use "this" keyword to refrence object and assign value to property of that
// object. While initializing an object it uses "new" keyword which create a new
// object and then "this" refer to that new object. If "new" is not used then "this"
// will refer to a window object in case of web browser and global object in case
// of node.js

function CreateCircle(radius) {
  this.radius = radius;
  this.draw = () => {
    console.log("Draw circle using constructor ", radius);
  };
}

const circleC = new CreateCircle(1);
circleC.draw();

// Every object in javascript has a constructor property. It refer to the function
// used to create that object. In built construtor functions are used in case of
// object literal syntax e.g
// new Object => const circle = {}
// new String => "", '', ``
// new Boolean => true, false
// new Function()

// !NOTE in javascript functions are objects
const CreateCircleInnerConstructor = new Function(
  ["radius", "x", "y"],
  `
    this.radius = radius;
    this.location = {
        x,
        y
    };
    this.draw = () => {
    console.log("Draw circle using inner constructor ", radius, x,y);
    };
`
);

const circleInnerConstructor = new CreateCircleInnerConstructor(1, 5, 4);
circleInnerConstructor.draw();

//Function.call take a object to be refrenced and args for the function
let circleForTestingCall = {};
CreateCircleInnerConstructor.call(circleForTestingCall, 1, 2, 3);
circleForTestingCall.draw();

//Function.apply take a object to be refrenced and args for the function as array
let circleForTestingApply = {};
CreateCircleInnerConstructor.apply(circleForTestingApply, [1, 2, 3]);
circleForTestingApply.draw();

// Javascript types
// 1- Primitive types  Number, String, Null, Boolean, Symbol, undefined
// ! Primitives are copied by value
// 2- Refrence types Object, Array, Function
// ! Objects are copied by refrence

// ! Arrays and functiions in javascript are also objects so there are Primitive
// ! types and objects in javascript

let value = 10;
const incrementVal = (val) => {
  val++;
};
incrementVal(value);
const object = {
  value: 10,
};

const incrementObj = (object) => {
  object.value++;
};

let learn1 = incrementObj(object);

// Adding and removing properties
// ! A property can be added directly or by passing string in brackets
// ! Bracket notation is used to access or initialize property that are delayed
// ! in call or have irregular syntax like email etc (Having sysmbols and rules
// ! other than that of naming convention.
circleL.area = circleL.radius * 2 * Math.PI;
circleL["1haseebshah936@gmail.com"] = 15;
// ! console.log(circleL.1haseebshah936@gmail.com) Throws error
console.log("1haseebshah936@gmail.com", circleL["1haseebshah936@gmail.com"]);
// ! delete is used to delete a property
// console.log(circleL.area);
delete circleL.area;
// console.log(circleL.area);
if ("area" in circleL) console.log("Area in circle"); // used to check if a variable exist in object

for (key in circleL) {
  // used to iterate in an object
  if (typeof circleL[key] !== "function") console.log(key, circleL[key]);
}

const keys = Object.keys(circleL); // get all the keys in an object
console.log(keys);

// Abstraction is hidding complexity from the end user
function StopWatch() {
  let duration = 0;
  let running = 0;
  let interval;
  this.start = () => {
    if (running) {
      console.log(new Error("Stop watch is already runing!!!"));
      return;
    }
    running = 1;
    interval = setInterval(() => {
      duration = duration + 1;
    }, 1000);
  };

  this.stop = () => {
    if (!running) {
      throw new Error("Stop watch never started!!!");
      return;
    }
    running = 0;
    clearInterval(interval);
  };

  this.reset = () => {
    if (running) {
      running = 0;
      clearInterval(interval);
    }
    duration = 0;
  };

  Object.defineProperty(this, "duration", {
    get: () => {
      console.log(duration + "s");
    },
  });
}

// const sw = new StopWatch();

// function StopWatchMosh() {
//   let startTime,
//     endTime,
//     running,
//     duration = 0;
//   this.start = () => {
//     if (running) {
//       throw new Error("Stop watch is already runing!!!");
//     }
//     running = true;
//     startTime = new Date().getTime();
//   };

//   this.stop = () => {
//     if (!running) {
//       throw new Error("Stop watch never started!!!");
//     }
//     running = false;
//     endTime = new Date().getTime();
//     duration = new Date().getTime(); - startTime;
//   };

//   this.reset = () => {
//     running = false;
//     duration = 0;
//     startTime = null;
//     endTime = null;
//   };

//   Object.defineProperty(this, "duration", {
//     get: () => {
//       if (endTime - startTime) {
//         duration += endTime - startTime;
//       }
//       console.log(duration + "s");
//     },
//   });
// }
