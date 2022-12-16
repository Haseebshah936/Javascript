const _radius = new WeakMap(); // Private property it is the implemenation details
export class Circle {
  // interface
  constructor(radius) {
    _radius.set(this, radius);
  }
  area() {
    return Math.PI * _radius.get(this) ** 2;
  }
  get _radius() {
    return _radius.get(this);
  }

  set _radius(value) {
    _radius.set(this, value);
  }
}
