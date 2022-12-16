// * Prototype refer to the object that is used as a base (parent) for creating another object.
// * Prototype is a property of constructor function and object.
const circle = new CreateCircle(1);
// ! Prototype of a constructor function is equal to the prototype of the object created by that constructor function.
const circleBase = Object.getPrototypeOf(circle);
console.log("🚀 ~ file: index.js:6 ~ circleBase ", circleBase);

console.log(
  "🚀 ~ file: index.js:8 ~ CreateCircle.prototype",
  CreateCircle.prototype
);
console.log(
  "🚀 ~ file: index.js:9 ~ circleBase === CreateCircle.prototype",
  circleBase === CreateCircle.prototype
);

// *Properties and function of a prototype have descritor.
// *Descriptor is an object that describes the access and rules of a property.
let propertyDesriptor = Object.getOwnPropertyDescriptor(
  Object.getPrototypeOf(CreateCircle),
  "toString"
);
console.log("🚀 ~ file: index.js:13 ~ propertyDesriptor", propertyDesriptor);
// * Descriptor has 4 properties: value, writable, enumerable, configurable.
console.log("🚀 ~ file: index.js:25 ~ value", value);

// * Value is the value of the property. And can be assigned by using this keyword. It will take the closest defination of the property if not found trace it back in the parent(base) object. For example CreateCircle does not have toString defined in it. But object which is the base object have toString function so "this" will refer to the defination of that toString inheritance.
Object.defineProperty(circleBase, "toString", {
  enumerable: true,
  value: this.toString,
  configurable: true,
  writable: true,
});
propertyDesriptor = Object.getOwnPropertyDescriptor(circleBase, "toString");
console.log("🚀 ~ file: index.js:26 ~ propertyDesriptor", propertyDesriptor);
console.log(Object.keys(circle));

// * Writable is a boolean that determines if the property can be changed.
Object.defineProperty(circle, "radius", {
  writable: true,
  enumerable: true,
  configurable: false,
});
console.log(circle.radius); // 1
circle.radius = 2;
console.log(circle.radius); // 2
console.log(Object.keys(circle)); // circle

circleBase.toString = () => {
  return "circle";
};
console.log(circleBase.toString()); // circle

// * Enumerable is a boolean that determines if the property can be iterated and if the property can be listed as key of the object. For example, if the property is enumerable, it will be listed in the result of Object.keys(). toString() is an example of non-enumerable property.

// !Object.keys only show instance members (own properties of object defined by the constructor. In other words it only show properties defined in constrctor).
Object.defineProperty(circleBase, "toString", {
  enumerable: true,
  value: this.toString,
  configurable: true,
  writable: true,
});
propertyDesriptor = Object.getOwnPropertyDescriptor(circleBase, "toString");
console.log("🚀 ~ file: index.js:57 ~ propertyDesriptor", propertyDesriptor);
console.log(Object.keys(circle)); // radius, draw

// !For...in loop show all members (own properties(instance members) and inherited properties(prototype members)))
// circle
for (let key in circle) {
  console.log(key); // radius, draw, toString
}

// * Configurable is a boolean that determines if the property can be deleted or changed.

// Object.defineProperty(circle, "radius", {
//   writable: false,
//   enumerable: false,
//   configurable: true,
// });
// delete circle.radius;
// console.log(circle); // draw
Object.defineProperty(circle, "radius", {
  writable: false,
  enumerable: true,
  configurable: false,
});
delete circle.radius;
console.log(circle); // radius, draw

// * Constructor property is a reference to the constructor function that created the object.
// ! If a value is not given to property at the time of creation, it will be undefined. Then the property is not enumerable and will not be listed in the result of Object.keys() or for...in loop.
// * Every object has a constructor property.
// * In order to remove code duplication espacially if a object is created alot of time the function gets created in all of its instances we can remove this issue by defining the function in the prototype of the constructor function.

function Car(price) {
  this.price = price;
  this.name;
}
Car.prototype.color = "red";
Object.defineProperties(Car.prototype, {
  price: {
    enumerable: true,
    writable: true,
    value: this.value,
    configurable: true,
  },
  name: {
    enumerable: true,
    writable: true,
  },
});

const car1 = new Car(10);
const car2 = new Car();

console.log(Object.keys(car1)); // price
for (key in car1) {
  console.log(key); // price, name
}
