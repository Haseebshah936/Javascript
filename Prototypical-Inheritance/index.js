// !Note implimentation of prototypical inheritance
// function Shape() {}

// function Circle(radius) {
//   this.radius = radius;
// }

// // To make a function a part of the parent we have to assign it to the prototype of the parent

// Shape.prototype.duplicate = function () {
//   console.log("duplicate");
// };

// // To inherit Circle from Shape we have to set the prototype of Circle to Shape prototype

// Circle.prototype = Object.create(Shape.prototype);
// // To use the dynamic method (new Circle.prototype.constructor) of Circle to create an object we have to set the constructor of Circle to Circle
// Circle.prototype.constructor = Circle;

// c = new Circle.prototype.constructor(10);

// !Note implimentation of prototypical inheritance with super to call the parent method to do acctual inheritance.

// * In order to staisfy the concept of inheritance we have to call the parent method in the child method and have to initialize the parent properties in the child. Like we do in java.

// function Shape(color) {
//   this.color = color;
//   Object.defineProperty(this, "color", {
//     enumerable: true,
//     value: this.color,
//     configurable: true,
//     writable: true,
//   });
// }
// const s = new Shape();

// const shapeBase = Object.getPrototypeOf(Shape);
// console.log(shapeBase);

// // Object.defineProperty(shapeBase, "toString", {
// //   enumerable: true,
// //   value: this.toString,
// //   configurable: true,
// //   writable: true,
// // });

// // console.log(Object.keys(shapeBase));

// for (let key in shapeBase) {
//   console.log(key);
// }

// console.log(Object.getOwnPropertyDescriptor(shapeBase, "toString"));

// function Circle(radius, color) {
//   Shape.call(this, color);
//   this.radius = radius;
// }

// Circle.prototype = Object.create(Shape.prototype);
// Circle.prototype.constructor = Circle;

// const c = new Circle(10, "red");

// console.log(Object.keys(c)); // radius, color
// for (let key in c) {
//   console.log(key); // radius, color
// }

// ! Note implimentation of prototypical inheritance with super to call the parent method to do acctual inheritance.

// function Shape(color) {
//   this.color = color;
//   this.draw = function () {
//     console.log("draw shap");
//   };
// }

// function Circle(radius, color) {
//   Shape.call(this, color);
//   this.radius = radius;
// }

// Circle.prototype = Object.create(Shape.prototype);
// Circle.prototype.constructor = Circle;

// const c = new Circle(10, "red");

function Shape(color, quantity) {
  this.color = color;
  this.quantity = quantity;
  this.area = function () {
    console.log("Shap area");
  };
}

// To import properties and method of the parent there are two ways
// ! 1- we have to use the new Object() method this is good if we only have method in parent object because by this we can not initialize the properties of parent object
// ! 2- we have to call the parent method in the child constructor just like we call it in child class in java to initialize the properties of parent class. In this cas we don;t use super keyword rather use function.call(this) to call the parent method and pass all the props to it. The props can be passed using ...args or by passing them one by one. At the time of calling the function in parameter ... is called rest operator and at the time of assigning it to the function it is called spread operator.

const Circle = function (...args) {
  //! 1- Method Shape.call(this); // to inherit the properties of the parent
  Shape.call(this, ...args);
  this.draw = function () {
    console.log("draw");
  };

  this.area = function () {
    console.log("Circle area");
  };
};

Shape.prototype.location = function () {
  console.log("location");
};

Circle.prototype = Object.create(Shape.prototype); // !Note this is not a good way to inherit the parent method because it will create a new object and refrence parent.prototype as the prototype of the child in this way the method assign to the prototype of the parent are inherited not the method of the parents and will not inherit the parent method. So we have to use new Parent() inherit the parent method.
// Circle.prototype = new Shape();
// to inherit the methods of the parent
Circle.prototype.constructor = Circle;
// ! Method overriding
// Circle.prototype.area = function () {
// //   Shape.prototype.location.call(this);
//   console.log("Circle location");
// };

const c = new Circle("red", 10);

// ! Exercise

function HtmlElement() {
  this.click = function () {
    console.log("clicked");
  };
}

HtmlElement.prototype.focus = function () {
  console.log("focused");
};

HtmlElement.prototype.render = function () {
  return `<></>`;
};

function HtmlSelectElement(items = []) {
  //   let items = items;
  //   HtmlElement.call(this);
  this.addItem = function (item) {
    items.push(item);
  };
  this.removeItem = function (item) {
    items.splice(items.indexOf(item), 1);
  };
  Object.defineProperty(this, "items", {
    get: function () {
      return items;
    },
  });
}

HtmlSelectElement.prototype = new HtmlElement();
HtmlSelectElement.prototype.constructor = HtmlSelectElement;

// const e = new HtmlSelectElement();

// ! Exercise Polymorphism

HtmlSelectElement.prototype.render = function () {
  let select = document.createElement("select");
  this.items.map((i) => {
    let option = select.appendChild(document.createElement("option"));
    option.value = i;
    option.text = i;
    return option;
  });
  return select;
};

function HtmlImageElement(src = "") {
  this.src = src;
}

HtmlImageElement.prototype = new HtmlElement();
HtmlImageElement.constructor = HtmlImageElement;

HtmlImageElement.prototype.render = function () {
  let img = document.createElement("img");
  img.setAttribute("src", this.src);
  return img;
};

const array = [new HtmlSelectElement([1, 2]), new HtmlImageElement("http://")];

console.log(Object.keys(array));
for (key of array) {
}
