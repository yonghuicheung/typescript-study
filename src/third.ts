/*
 * @Description: ts学习day-03
 * @Autor: zhangyonghui
 * @Date: 2021-03-10 09:30:18
 * @LastEditors: zhangyonghui
 * @LastEditTime: 2021-03-10 17:50:27
 */
// 类型断言
// 将一个联合类型断言为其中一个类型
// 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型中共有的属性或方法
interface Cat {
  name: string;
  run: () => void;
}
interface Fish {
  name: string;
  swim: () => void;
}
// function isFish(animal: Cat | Fish) {
//   // 类型“Cat | Fish”上不存在属性“swim”。
//   // 类型“Cat”上不存在属性“swim”。
//   if (typeof animal.swim === "function") {
//     // error
//     return true;
//   }
//   return false;
// }
// 可以使用类型断言，将 animal 断言成 Fish
function isFish(animal: Cat | Fish) {
  if (typeof (animal as Fish).swim === "function") {
    return true;
  }
  return false;
} // ok
// 需要注意的是，类型断言只能够「欺骗」TypeScript 编译器，无法避免运行时的错误，反而滥用类型断言可能会导致运行时错误
function swim(animal: Cat | Fish) {
  (animal as Fish).swim();
}
const tom11: Cat = {
  name: "Tom",
  run() {
    console.log("run");
  },
};
// Uncaught TypeError: animal.swim is not a function 总之，使用类型断言时一定要格外小心，尽量避免断言后调用方法或引用深层属性，以减少不必要的运行时错误
swim(tom11); // 运行时error
// 将一个父类断言为更加具体的子类
// 我们声明了函数 isApiError，它用来判断传入的参数是不是 ApiError 类型，
// 为了实现这样一个函数，它的参数的类型肯定得是比较抽象的父类 Error，这样的话这个函数就能接受 Error 或它的子类作为参数了
// 由于父类 Error 中没有 code 属性，故直接获取 error.code 会报错，需要使用类型断言获取 (error as ApiError).code
// 使用 instanceof 更加合适，因为 ApiError 是一个 JavaScript 的类，能够通过 instanceof 来判断 error 是否是它的实例
// class ApiError extends Error {
//   code: number = 0;
// }
// class HttpError extends Error {
//   statusCode: number = 200;
// }
// function isApiError(error: Error) {
//   if (typeof (error as ApiError).code === "number") {
//     return true;
//   }
//   return false;
// }
// 但是有的情况下 ApiError 和 HttpError 不是一个真正的类，而只是一个 TypeScript 的接口（interface
// 接口是一个类型，不是一个真正的值，它在编译结果中会被删除，当然就无法使用 instanceof 来做运行时判断了
interface ApiError2 extends Error {
  code: number;
}
interface HttpError2 extends Error {
  statusCode: number;
}
function isApiError2(error: Error) {
  // 此时就只能用类型断言，通过判断是否存在 code 属性，来判断传入的参数是不是 ApiError 了
  // “ApiError2”仅表示类型，但在此处却作为值使用。
  // if (error instanceof ApiError2) {
  //   // error
  //   return true;
  // }
  if (typeof (error as ApiError2).code === "number") {
    return true;
  }
  return false;
}

// 将任何一个类型断言为 any
// 理想情况下，TypeScript 的类型系统运转良好，每个值的类型都具体而精确。
// 当我们引用一个在此类型上不存在的属性或方法时，就会报错
const foo: number = 1;
// 类型“number”上不存在属性“length”
// foo.length = 1; // error
// 但有的时候，我们非常确定这段代码不会出错
// 类型“Window & typeof globalThis”上不存在属性“foo”
// window.foo = 1; // error
// 此时我们可以使用 as any 临时将 window 断言为 any 类型
// 在 any 类型的变量上，访问任何属性都是允许的。
// 需要注意的是，将一个变量断言为 any 可以说是解决 TypeScript 中类型问题的最后一个手段。
// 它极有可能掩盖了真正的类型错误，所以如果不是非常确定，就不要使用 as any
// 我们也可以通过[扩展 window 的类型（TODO）][]解决这个错误，不过如果只是临时的增加 foo 属性，as any 会更加方便
// 总之，一方面不能滥用 as any，另一方面也不要完全否定它的作用
// 我们需要在类型的严格性和开发的便利性之间掌握平衡（这也是 TypeScript 的设计理念之一），才能发挥出 TypeScript 最大的价值
(window as any).foo = 1; // ok
// 将 any 断言为一个具体的类型
// 遇到 any 类型的变量时，我们可以选择无视它，任由它滋生更多的 any。
// 我们也可以选择改进它，通过类型断言及时的把 any 断言为精确的类型，亡羊补牢，使我们的代码向着高可维护性的目标发展
function getCacheData(key: string): any {
  return (window as any).cache[key];
}
interface Cat {
  name: string;
  run: () => void;
}
const tom12 = getCacheData("tom") as Cat;
tom12.run();

// 类型断言的限制
interface Animal {
  name: string;
}
interface Cat {
  name: string;
  run: () => void;
}
let tom13: Cat = {
  name: "Tom",
  run: () => {
    console.log("run");
  },
};
let animal: Animal = tom13;
// 我们知道，TypeScript 是结构类型系统，类型之间的对比只会比较它们最终的结构，而会忽略它们定义时的关系。
// 在上面的例子中，Cat 包含了 Animal 中的所有属性
// 除此之外，它还有一个额外的方法 run。TypeScript 并不关心 Cat 和 Animal 之间定义时是什么关系
// 而只会看它们最终的结构有什么关系——所以它与 Cat extends Animal 是等价的
interface Animal {
  name: string;
}
interface Cat extends Animal {
  run: () => void;
}
// 那么也不难理解为什么 Cat 类型的 tom 可以赋值给 Animal 类型的 animal 了——就像面向对象编程中我们可以将子类的实例赋值给类型为父类的变量。
// 我们把它换成 TypeScript 中更专业的说法，即：Animal 兼容 Cat。
// 当 Animal 兼容 Cat 时，它们就可以互相进行类型断言了
function testAnimal(animal: Animal) {
  return animal as Cat;
}
function testCat(cat: Cat) {
  return cat as Animal;
}

// 双重断言
// 在上面的例子中，若直接使用 cat as Fish 肯定会报错，因为 Cat 和 Fish 互相都不兼容。
// 但是若使用双重断言，则可以打破「要使得 A 能够被断言为 B，只需要 A 兼容 B 或 B 兼容 A 即可」的限制，将任何一个类型断言为任何另一个类型。
// 若你使用了这种双重断言，那么十有八九是非常错误的，它很可能会导致运行时错误。
// 除非迫不得已，千万别用双重断言
interface Cat {
  run: () => void;
}
interface Fish {
  swim: () => void;
}
function testCat1(cat: Cat) {
  return (cat as any) as Fish;
}

// 类型断言 vs 类型转换
// 类型断言只会影响 TypeScript 编译时的类型，类型断言语句在编译结果中会被删除
function toBoolean(something: any): boolean {
  return something as boolean;
}
toBoolean(1);
// 所以类型断言不是类型转换，它不会真的影响到变量的类型。
// 若要进行类型转换，需要直接调用类型转换的方法
function toBoolean1(something: any): boolean {
  return Boolean(something);
}

toBoolean(1);

// 类型断言 vs 类型声明
function getCacheData1(key: string): any {
  return (window as any).cache[key];
}
interface Cat {
  name: string;
  run: () => void;
}
const tom14 = getCacheData("tom") as Cat;
tom14.run();
// 我们使用 as Cat 将 any 类型断言为了 Cat 类型。
// 但实际上还有其他方式可以解决这个问题
const tom15: Cat = getCacheData("tom");
tom15.run();
// 它们的区别，可以通过这个例子来理解
interface Animal {
  name: string;
}
interface Cat {
  name: string;
  run: () => void;
}
const animal1: Animal = {
  name: "tom",
};
let tom16 = animal as Cat;

const animal2: Animal = {
  name: "tom",
};
// 类型 "Animal" 中缺少属性 "run"，但类型 "Cat" 中需要该属性
// let tom17: Cat = animal2; // error

// 类型断言 vs 泛型
function getCacheData2<T>(key: string): T {
  return (window as any).cache[key];
}
interface Cat {
  name: string;
  run: () => void;
}
const tom18 = getCacheData2<Cat>("tom");
tom18.run();

// 声明文件
// 找不到名称“jQuery”
// jQuery("#foo"); // error
// npm i @types/jquery -D

// 内置对象
// ECMAScript 的内置对象
let b: Boolean = new Boolean(1);
let e: Error = new Error("Error occurred");
let d: Date = new Date();
let r: RegExp = /[a-z]/;

// DOM 和 BOM 的内置对象
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll("div");
document.addEventListener("click", function (e: MouseEvent) {
  // Do something
});

// TypeScript 核心库的定义文件
// 类型“string”的参数不能赋给类型“number”的参数。
// Math.pow(10, '2'); // error
// document.addEventListener("click", function (e) {
//   // 类型“MouseEvent”上不存在属性“targetCurrent”
//   console.log(e.targetCurrent); // error
// });

// 用 TypeScript 写 Node.js
// Node.js 不是内置对象的一部分，如果想用 TypeScript 写 Node.js，则需要引入第三方声明文件
// npm install @types/node --save-dev

// 类型别名
// 类型别名用来给一个类型起个新名字
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
  if (typeof n === "string") {
    return n;
  } else {
    return n();
  }
}

// 字符串字面量类型
// 字符串字面量类型用来约束取值只能是某几个字符串中的一个
type EventNames = "click" | "scroll" | "mousemove";
function handleEvent(ele: Element, event: EventNames) {
  // do something
}

handleEvent(document.getElementById("hello"), "scroll"); // 没问题
// handleEvent(document.getElementById("world"), "dblclick"); // 报错，event 不能为 'dblclick'

// 元组
// 数组合并了相同类型的对象，而元组（Tuple）合并了不同类型的对象
// 定义一对值分别为 string 和 number 的元组
let tom19: [string, number] = ["Tom", 25];
// 当赋值或访问一个已知索引的元素时，会得到正确的类型
let tom20: [string, number];
tom20[0] = "Tom";
tom20[1] = 25;
tom20[0].slice(1);
tom20[1].toFixed(2);
// 但是当直接对元组类型的变量进行初始化或者赋值的时候，需要提供所有元组类型中指定的项
tom20 = ["Tom", 25];
// 类型“string[]”缺少类型“Person”中的以下属性: name, age
// tom = ["Tom"]; // error

// 越界的元素
// 当添加越界的元素时，它的类型会被限制为元组中每个类型的联合类型
tom20.push("male");
// 类型“boolean”的参数不能赋给类型“string | number”的参数
// tom20.push(true); // error

// 枚举
// 枚举（Enum）类型用于取值被限定在一定范围内的场景，比如一周只能有七天，颜色限定为红绿蓝等
enum Days {
  Sun,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}
console.log(Days["Sun"] === 0); // true
console.log(Days["Mon"] === 1); // true
console.log(Days["Tue"] === 2); // true
console.log(Days["Sat"] === 6); // true

console.log(Days[0] === "Sun"); // true
console.log(Days[1] === "Mon"); // true
console.log(Days[2] === "Tue"); // true
console.log(Days[6] === "Sat"); // true

// 手动赋值
enum Days1 {
  Sun = 7,
  Mon = 1,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}

console.log(Days1["Sun"] === 7); // true
console.log(Days1["Mon"] === 1); // true
console.log(Days1["Tue"] === 2); // true
console.log(Days1["Sat"] === 6); // true
// 如果未手动赋值的枚举项与手动赋值的重复了，TypeScript 是不会察觉到这一点的
enum Days2 {
  Sun = 3,
  Mon = 1,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}

console.log(Days2["Sun"] === 3); // true
console.log(Days2["Wed"] === 3); // true
console.log(Days2[3] === "Sun"); // false
console.log(Days2[3] === "Wed"); // true
// 手动赋值的枚举项可以不是数字，此时需要使用类型断言来让 tsc 无视类型检查 (编译出的 js 仍然是可用的)
enum Days3 {
  Sun = 7,
  Mon,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat = <any>"S",
}
// 当然，手动赋值的枚举项也可以为小数或负数，此时后续未手动赋值的项的递增步长仍为 1
enum Days4 {
  Sun = 7,
  Mon = 1.5,
  Tue,
  Wed,
  Thu,
  Fri,
  Sat,
}

console.log(Days4["Sun"] === 7); // true
console.log(Days4["Mon"] === 1.5); // true
console.log(Days4["Tue"] === 2.5); // true
console.log(Days4["Sat"] === 6.5); // true

// 常数项和计算所得项
enum Color {
  Red,
  Green,
  Blue = "blue".length,
}
// 上面的例子不会报错，但是如果紧接在计算所得项后面的是未手动赋值的项，那么它就会因为无法获得初始值而报错
// enum Color1 {
//   Red = "red".length,
//   // 枚举成员必须具有初始化表达式
//   Green, // error
//   Blue, // error
// }

// 常数枚举
const enum Directions {
  Up,
  Down,
  Left,
  Right,
}
// 常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
// 假如包含了计算成员，则会在编译阶段报错
// const enum Color1 {
//   Red,
//   Green,
//   // 常量枚举成员初始值设定项只能包含文字值和其他计算的枚举值
//   Blue = "blue".length, // error
// }

// 外部枚举
// 外部枚举（Ambient Enums）是使用 declare enum 定义的枚举类型
// 外部枚举与声明语句一样，常出现在声明文件中
declare enum Directions1 {
  Up,
  Down,
  Left,
  Right,
}

let directions1 = [Directions1.Up, Directions1.Down, Directions1.Left, Directions1.Right];
// 同时使用 declare 和 const 也是可以的
declare const enum Directions2 {
  Up,
  Down,
  Left,
  Right,
}

let directions2 = [Directions2.Up, Directions2.Down, Directions2.Left, Directions2.Right];

// 类
// public private 和 protected
// TypeScript 可以使用三种访问修饰符（Access Modifiers），分别是 public、private 和 protected。
// public 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
// private 修饰的属性或方法是私有的，不能在声明它的类的外部访问
// protected 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的
class Animal {
  public name;
  public constructor(name: string) {
    this.name = name;
  }
}
let a1 = new Animal("Jack");
console.log(a1.name);
a1.name = "Tom";
console.log(a1.name);
// 上面的例子中，name 被设置为了 public，所以直接访问实例的 name 属性是允许的。
// 很多时候，我们希望有的属性是无法直接存取的，这时候就可以用 private 了
// 需要注意的是，TypeScript 编译之后的代码中，并没有限制 private 属性在外部的可访问性
// class Animal1 {
//   private name: string;
//   public constructor(name: string) {
//     this.name = name;
//   }
// }

// let a2 = new Animal1("Jack");
// // 属性“name”为私有属性，只能在类“Animal1”中访问
// console.log(a2.name); // error
// a2.name = "Tom";
// 使用 private 修饰的属性或方法，在子类中也是不允许访问的
// class Animal2 {
//   private name;
//   public constructor(name: string) {
//     this.name = name;
//   }
// }
// class Cat1 extends Animal2 {
//   constructor(name: string) {
//     super(name);
//     // 属性“name”为私有属性，只能在类“Animal2”中访问
//     console.log(this.name); // error
//   }
// }
// 而如果是用 protected 修饰，则允许在子类中访问
class Animal3 {
  protected name;
  public constructor(name: string) {
    this.name = name;
  }
}
class Cat3 extends Animal3 {
  constructor(name: string) {
    super(name);
    console.log(this.name);
  }
}
// 当构造函数修饰为 private 时，该类不允许被继承或者实例化
// class Animal4 {
//   public name;
//   private constructor(name: string) {
//     this.name = name;
//   }
// }
// // 无法扩展类“Animal4”。类构造函数标记为私有
// // error
// class Cat4 extends Animal4 {
//   constructor(name: string) {
//     super(name);
//   }
// }
// let a4 = new Animal("Jack");
// 当构造函数修饰为 protected 时，该类只允许被继承
// class Animal5 {
//   public name;
//   protected constructor(name: string) {
//     this.name = name;
//   }
// }
// class Cat extends Animal5 {
//   constructor(name: string) {
//     super(name);
//   }
// }
// // 类“Animal5”的构造函数是受保护的，仅可在类声明中访问
// let a5 = new Animal5("Jack"); // error
// 参数属性
class Animal5 {
  // public name: string;
  // 修饰符和readonly还可以使用在构造函数参数中，等同于类中定义该属性同时给该属性赋值，使代码更简洁
  public constructor(public name: string) {
    // this.name = name;
  }
}
// readonly
// 只读属性关键字，只允许出现在属性声明或索引签名或构造函数中
// class Animal6 {
//   readonly name;
//   public constructor(name: string) {
//     this.name = name;
//   }
// }

// let a6 = new Animal6("Jack");
// console.log(a6.name); // Jack
// // 无法分配到 "name" ，因为它是只读属性
// a6.name = "Tom"; // error
// 注意如果 readonly 和其他访问修饰符同时存在的话，需要写在其后面
class Animal7 {
  // public readonly name;
  public constructor(public readonly name: string) {
    // this.name = name;
  }
}
// 抽象类
// abstract 用于定义抽象类和其中的抽象方法
abstract class Animal8 {
  public name: string;
  public constructor(name: string) {
    this.name = name;
  }
  public abstract sayHi(): void;
}
// 无法创建抽象类的实例
// let a8 = new Animal8("Jack"); // error
// 抽象类中的抽象方法必须被子类实现
// 非抽象类“Cat8”不会实现继承自“Animal8”类的抽象成员“sayHi”
// class Cat8 extends Animal8 {
//   public eat() {
//     console.log(`${this.name} is eating.`);
//   }
// }
// let cat8 = new Cat8("Tom");
// 上面的例子中，我们定义了一个类 Cat 继承了抽象类 Animal，但是没有实现抽象方法 sayHi，所以编译报错了
class Cat8 extends Animal8 {
  public sayHi() {
    console.log(`Meow, My name is ${this.name}`);
  }
}
let cat8 = new Cat8("Tom");

// 类的类型
// 给类加上 TypeScript 的类型很简单，与接口类似
class Animal9 {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  sayHi(): string {
    return `My name is ${this.name}`;
  }
}

let a9: Animal9 = new Animal9("Jack");
console.log(a9.sayHi()); // My name is Jack
