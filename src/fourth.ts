/*
 * @Description: ts学习day-04
 * @Autor: zhangyonghui
 * @Date: 2021-03-11 09:45:13
 * @LastEditors: zhangyonghui
 * @LastEditTime: 2021-03-11 15:51:44
 */
// 类
// 类实现接口 implements
// 实现（implements）是面向对象中的一个重要概念。一般来讲，一个类只能继承自另一个类，有时候不同类之间可以有一些共有的特性
// 这时候就可以把特性提取成接口（interfaces），用 implements 关键字来实现。这个特性大大提高了面向对象的灵活性。
// 举例来说，门是一个类，防盗门是门的子类。如果防盗门有一个报警器的功能，我们可以简单的给防盗门添加一个报警方法
// 这时候如果有另一个类，车，也有报警器的功能，就可以考虑把报警器提取出来，作为一个接口，防盗门和车都去实现它
interface Alarm {
  alert: () => void;
}
class Door {}
class SecurityDoor extends Door implements Alarm {
  alert() {
    console.log("Security alert");
  }
}
class Car implements Alarm {
  alert() {
    console.log("Car alert");
  }
}
// 一个类可以实现多个接口
// Car 实现了 Alarm 和 Light 接口，既能报警，也能开关车灯
interface Light {
  lightOn: () => void;
  lightOff: () => void;
}
class Car1 implements Alarm, Light {
  alert() {
    console.log("Car alert");
  }
  lightOn() {
    console.log("Car light on");
  }
  lightOff() {
    console.log("Car light off");
  }
}

// 接口继承接口
// 接口与接口之间可以是继承关系
// 这很好理解，LightableAlarm 继承了 Alarm，除了拥有 alert 方法之外，还拥有两个新方法 lightOn 和 lightOff
interface LightableAlarm extends Alarm {
  lightOn: () => void;
  lightOff: () => void;
}

// 接口继承类
// 在接口继承类的时候，也只会继承它的实例属性和实例方法
// 实际上，当我们在声明 class Point 时，除了会创建一个名为 Point 的类之外，同时也创建了一个名为 Point 的类型（实例的类型）。
// 所以我们既可以将 Point 当做一个类来用（使用 new Point 创建它的实例）
// 也可以将 Point 当做一个类型来用（使用 : Point 表示参数的类型）
// 当我们声明 interface Point3d extends Point 时，Point3d 继承的实际上是类 Point 的实例的类型
// 明 Point 类时创建的 Point 类型只包含其中的实例属性和实例方法
class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}
interface Point3d extends Point {
  z: number;
}
let point3d: Point3d = {
  x: 1,
  y: 2,
  z: 3,
};

// 泛型
// 泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性
// 这段代码编译不会报错，但是一个显而易见的缺陷是，它并没有准确的定义返回值的类型：
// Array<any> 允许数组的每一项都为任意类型。但是我们预期的是，数组中每一项都应该是输入的 value 的类型
function createArray(length: number, value: any): Array<any> {
  let result = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}
createArray(3, "x"); // ['x', 'x', 'x']
// 我们在函数名后添加了 <T>，其中 T 用来指代任意输入的类型，在后面的输入 value: T 和输出 Array<T> 中即可使用了
function createArray1<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}
createArray1<string>(3, "x"); // ['x', 'x', 'x']

// 多个类型参数
function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}
swap([7, "seven"]);

// 泛型约束
// 在函数内部使用泛型变量的时候，由于事先不知道它是哪种类型，所以不能随意的操作它的属性或方法
// 泛型 T 不一定包含属性 length，所以编译的时候报错了
// function loogingIdentity<T>(arg: T): T {
//   // 类型“T”上不存在属性“length”
//   console.log(arg.length); // error
//   return arg;
// }
interface Lengthwise {
  length: number;
}
// 我们使用了 extends 约束了泛型 T 必须符合接口 Lengthwise 的形状，也就是必须包含 length 属性
function loggingIdentity1<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
// 类型“number”的参数不能赋给类型“Lengthwise”的参数
// loggingIdentity1(7); // error
// 多个类型参数之间也可以互相约束
function copyFields<T extends U, U>(target: T, source: U): T {
  for (const id in source) {
    if (Object.prototype.hasOwnProperty.call(source, id)) {
      target[id] = (<T>source)[id];
    }
  }
  return target;
}
let x = { a: 1, b: 2, c: 3, d: 4 };
copyFields(x, { b: 10, d: 20 });

// 泛型接口
// 可以使用接口的方式来定义一个函数需要符合的形状
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let mySearch1: SearchFunc;
mySearch1 = function (source: string, subString: string) {
  return source.search(subString) !== -1;
};
// 当然也可以使用含有泛型的接口来定义函数的形状
interface CreateArrayFunc {
  <T>(length: number, value: T): Array<T>;
}
let createArray2: CreateArrayFunc;
createArray2 = function <T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
};
createArray2(3, "x");
// 进一步，我们可以把泛型参数提前到接口名上
interface CreateArrayFunc1<T> {
  (length: number, value: T): Array<T>;
}
let createArray3: CreateArrayFunc1<any>;
createArray3 = function <T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
};
createArray3(3, "x");

// 泛型类
class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;
}
let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};

// 泛型参数的默认类型
// 在 TypeScript 2.3 以后，我们可以为泛型中的类型参数指定默认类型
// 当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用
function createArray4<T = string>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}

// 声明合并
// 如果定义了两个相同名字的函数、接口或类，那么它们会合并成一个类型
// 函数的合并
// 我们可以使用重载定义多个函数类型
function reverse1(x: number): number;
function reverse1(x: string): string;
function reverse1(x: number | string): number | string {
  if (typeof x === "number") {
    return Number(x.toString().split("").reverse().join(""));
  } else if (typeof x === "string") {
    return x.split("").reverse().join("");
  }
}

// 接口的合并
// 接口中的属性在合并时会简单的合并到一个接口中
interface Alarm1 {
  price: number;
  alert: (s: string) => string;
}
interface Alarm1 {
  weight: number;
}
// 注意，合并的属性的类型必须是唯一的
interface Alarm1 {
  price: number; // 虽然重复了，但是类型都是 `number`，所以不会报错
  weight: number;
}
// interface Alarm1 {
//   // 后续属性声明必须属于同一类型。属性“price”的类型必须为“number”，但此处却为类型“string”
//   price: string; // error
// }
// 接口中方法的合并，与函数的合并一样
// interface Alarm1 {
//   // 后续属性声明必须属于同一类型。属性“alert”的类型必须为“(s: string) => string”，但此处却为类型“(s: string, n: number) => string”
//   alert: (s: string, n: number) => string; // error
// }
