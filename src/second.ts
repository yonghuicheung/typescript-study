/*
 * @Description: ts学习day-02
 * @Autor: zhangyonghui
 * @Date: 2021-03-09 09:39:15
 * @LastEditors: zhangyonghui
 * @LastEditTime: 2021-03-09 20:19:48
 */
// 空值
// JavaScript 没有空值（Void）的概念，在 TypeScript 中，可以用 void 表示没有任何返回值的函数
function alertName(): void {
  alert("My name is Tom");
} // ok
// 声明一个 void 类型的变量没有什么用，因为你只能将它赋值为 undefined 和 null
let unusable: void = undefined; // ok

// Null 和 Undefined
// 在 TypeScript 中，可以使用 null 和 undefined 来定义这两个原始数据类型
let u: undefined = undefined; // ok
let n: null = null; // ok
// 与 void 的区别是，undefined 和 null 是所有类型的子类型。也就是说 undefined 类型的变量，可以赋值给 number 类型的变量
let num: number = undefined; // ok
let u1: undefined;
let num1: number = u1; // ok
// 而 void 类型的变量不能赋值给 number 类型的变量
let u2: void;
// 不能将类型“void”分配给类型“number”。
// let num2: number = u2; // error

// 任意值
// 如果是一个普通类型，在赋值过程中改变类型是不被允许的
// let myFavoriteNumber: string = "seven";
// 不能将类型“number”分配给类型“string”。
// myFavoriteNumber = 7; // error
// 但如果是 any 类型，则允许被赋值为任意类型
let myFavoriteNumber: any = "seven";
myFavoriteNumber = 7; // ok
let anyThing: any = "hello";
// 在任意值上访问任何属性都是允许的
console.log(anyThing.myName); // ok
console.log(anyThing.myName.firstName); // ok
let anyThing1: any = "Tom";
// 也允许调用任何方法
// 可以认为，声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值
anyThing1.setName("Jerry"); // ok
anyThing1.setName("Jerry").sayHello(); // ok
anyThing1.myName.setFirstName("Cat"); // ok
// 变量如果在声明的时候，未指定其类型，那么它会被识别为任意值类型
let something;
something = "seven"; // ok
something = 7; // ok
// something.setName("Tome"); // ok strict模式运行会报错 类型“number”上不存在属性“setName”。

// 类型推论
// TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是类型推论
let myFavoriteNumber1 = "seven";
// 不能将类型“number”分配给类型“string”。
// myFavoriteNumber1 = 7; // error
// 如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查
let myFavoriteNumber2;
myFavoriteNumber2 = "seven"; // ok
myFavoriteNumber2 = 7; // ok

// 联合类型
// 允许 myFavoriteNumber 的类型是 string 或者 number，但是不能是其他类型
let myFavoriteNumber3: string | number;
myFavoriteNumber3 = "seven"; // ok
myFavoriteNumber3 = 7; // ok
// 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法
// function getLength(something: string | number): number {
// length 不是 string 和 number 的共有属性，所以会报错
// 类型“string | number”上不存在属性“legnth”。类型“string”上不存在属性“legnth”。
// return something.legnth; // error
// }
// 访问 string 和 number 的共有属性是没问题的
function getString(something: string | number): string {
  return something.toString(); // ok
}
// 联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型
let myFavoriteNumber4: string | number;
myFavoriteNumber4 = "seven";
// myFavoriteNumber 被推断成了 string，访问它的 length 属性不会报错
console.log(myFavoriteNumber4.length); // ok
myFavoriteNumber4 = 7;
// myFavoriteNumber 被推断成了 number，访问它的 length 属性时就报错了
// console.log(myFavoriteNumber4.length); // error

// 对象的类型——接口
// 赋值的时候，变量的形状必须和接口的形状保持一致
// 接口一般首字母大写。有的编程语言中会建议接口的名称加上 I 前缀
interface Person {
  name: string;
  age: number;
}
// 我们定义了一个接口 Person，接着定义了一个变量 tom，它的类型是 Person。这样，我们就约束了 tom 的形状必须和接口 Person 一致
let tom: Person = {
  name: "Tom",
  age: 25,
}; // ok
// 定义的变量比接口少了一些属性是不允许的
// 类型 "{ name: string; }" 中缺少属性 "age"，但类型 "Person" 中需要该属性。
// let tom1: Person = {
//   name: "Tom",
// }; // error
// 多一些属性也是不允许的
// let tom2: Person = {
//   name: "Tom",
//   age: 25,
//   // 不能将类型“{ name: string; age: number; gender: string; }”分配给类型“Person”。
//   // 对象文字可以只指定已知属性，并且“gender”不在类型“Person”中。
//   gender: "male",
// }; //
// 有时我们希望不要完全匹配一个形状，那么可以用可选属性
// 可选属性的含义是该属性可以不存在
// 这时仍然不允许添加未定义的属性
interface Person1 {
  name: string;
  age?: number;
}
let tom3: Person1 = {
  name: "Tom",
}; // ok
// let tom4: Person = {
//   name: "Tom",
//   age: 25,
//   // 不能将类型“{ name: string; age: number; gender: string; }”分配给类型“Person”。
//   // 对象文字可以只指定已知属性，并且“gender”不在类型“Person”中。
//   gender: "male",
// }; // error
// 有时候我们希望一个接口允许有任意的属性，可以使用任意属性
interface Person2 {
  name: string;
  age?: number;
  // [propName: string] 定义了任意属性取 string 类型的值
  [propName: string]: any;
}
let tom5: Person2 = {
  name: "Tom",
  gender: "male",
}; // ok
// 需要注意的是，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集
// interface Person3 {
//   name: string;
//   // 类型“number”的属性“age”不能赋给字符串索引类型“string”。
//   age?: number;
//   [propName: string]: string;
// }
// // 不能将类型“{ name: string; age: number; gender: string; }”分配给类型“Person3”。
// // 属性“age”与索引签名不兼容。
// // 不能将类型“number”分配给类型“string”。
// let tom6: Person3 = {
//   name: "Tom",
//   age: 25,
//   gender: "male",
// }; // error
// 一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型
interface Person4 {
  name: string;
  age?: number;
  [propName: string]: string | number;
}
let tom7: Person4 = {
  name: "Tom",
  age: 25,
  gender: "male",
}; // ok
// 有时候我们希望对象中的一些字段只能在创建的时候被赋值，那么可以用 readonly 定义只读属性
interface Person5 {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: any;
}
let tom8: Person5 = {
  id: 9527,
  name: "Tom",
  gender: "male",
};
// 无法分配到 "id" ，因为它是只读属性
// tom8.id = 1012; // error
// 注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候
interface Person6 {
  readonly id: number;
  name: string;
  age?: number;
  [propName: string]: any;
}
// 类型 "{ name: string; gender: string; }" 中缺少属性 "id"，但类型 "Person6" 中需要该属性
// let tom9: Person6 = {
//   name: "Tom",
//   gender: "male",
// }; // error
// // 无法分配到 "id" ，因为它是只读属性
// tom9.id = 9527; // error

// 数组的类型
// 「类型 + 方括号」表示法
let fibonacci: number[] = [1, 1, 2, 3, 5]; // ok
// 数组的项中不允许出现其他的类型
// 不能将类型“string”分配给类型“number”
// let fibonacci1: number[] = [1, "1", 2, 3, 5]; // error
// 数组的一些方法的参数也会根据数组在定义时约定的类型进行限制
// 类型“string”的参数不能赋给类型“number”的参数
// fibonacci.push("8"); // error
// 数组泛型
let fibonacci2: Array<number> = [1, 1, 2, 3, 5]; // ok
// 用接口表示数组
interface NumberArray {
  [index: number]: number;
}
// NumberArray 表示：只要索引的类型是数字时，那么值的类型必须是数字。
// 虽然接口也可以用来描述数组，但是我们一般不会这么做，因为这种方式比前两种方式复杂多了。
// 不过有一种情况例外，那就是它常用来表示类数组
let fibonacci3: NumberArray = [1, 1, 2, 3, 5]; // ok
// 类数组
// 类数组（Array-like Object）不是数组类型
// function sum() {
//   // 类型“IArguments”缺少类型“number[]”的以下属性: pop, push, concat, join 及其他 26 项
//   let args: number[] = arguments; // error
// }
// arguments 实际上是一个类数组，不能用普通的数组的方式来描述，而应该用接口
// 我们除了约束当索引的类型是数字时，值的类型必须是数字之外，也约束了它还有 length 和 callee 两个属性
function sum1() {
  let args: {
    [index: number]: number;
    length: number;
    callee: Function;
  } = arguments;
} // ok
// 常用的类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection 等
function sum2() {
  let args: IArguments = arguments;
} // ok
// IArguments 是 TypeScript 中定义好了的类型，它实际上就是
interface IArguments {
  [index: number]: any;
  length: number;
  callee: Function;
}
// any 在数组中的应用 一个比较常见的做法是，用 any 表示数组中允许出现任意类型
let list: any[] = ["xiaoming", 25, { website: "www.baidu.com" }]; // ok

// 函数的类型
// 函数声明
function sum3(x: number, y: number): number {
  return x + y;
} // ok
// 输入多余的（或者少于要求的）参数，是不被允许的
// 应有 2 个参数，但获得 3 个
// sum3(1, 2, 3); // error
// 应有 2 个参数，但获得 1 个
// sum3(1); // error
// 函数表达式
// 下面的代码只对等号右侧的匿名函数进行了类型定义，而等号左边的 mySum，是通过赋值操作进行类型推论而推断出来的
let mySum = function (x: number, y: number): number {
  return x + y;
}; // ok
// 如果需要我们手动给 mySum 添加类型，则应该是这样
let mySum1: (x: number, y: number) => number = function (x: number, y: number): number {
  return x + y;
}; // ok
// 用接口定义函数的形状
// 采用函数表达式|接口定义函数的方式时，对等号左侧进行类型限制，可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function (source: string, subString: string) {
  return source.search(subString) !== -1;
}; // ok
// 可选参数
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
    return firstName + " " + lastName;
  } else {
    return firstName;
  }
}
let tomcat = buildName("Tom", "Cat"); // ok
let tom10 = buildName("Tom"); // ok
// 需要注意的是，可选参数必须接在必需参数后面。换句话说，可选参数后面不允许再出现必需参数了
// 必选参数不能位于可选参数后。
// function buildName1(firstName?: string, lastName: string) { // error
//   if (firstName) {
//     return firstName + " " + lastName;
//   } else {
//     return lastName;
//   }
// }
// let tomcat1 = buildName("Tom", "Cat");
// let tom11 = buildName(undefined, "Tom");
// 参数默认值
// 在 ES6 中，我们允许给函数的参数添加默认值，TypeScript 会将添加了默认值的参数识别为可选参数
// 此时就不受「可选参数必须接在必需参数后面」的限制了
function buildName2(firstName: string = "Tom", lastName: string) {
  return firstName + " " + lastName;
}
let tomcat1 = buildName2("Tom", "Cat"); // ok
let cat = buildName2(undefined, "Cat"); // ok
// 剩余参数
// 注意，rest 参数只能是最后一个参数
function push(array: number[], ...items: any[]) {
  items.forEach(item => {
    array.push(item);
  });
}
let a: number[] = [];
push(a, 1, 2, 3); // ok
// 重载
// 重载允许一个函数接受不同数量或类型的参数时，作出不同的处理。
// 比如，我们需要实现一个函数 reverse，输入数字 123 的时候，输出反转的数字 321，输入字符串 'hello' 的时候，输出反转的字符串 'olleh'。
// 然而这样有一个缺点，就是不能够精确的表达，输入为数字的时候，输出也应该为数字，输入为字符串的时候，输出也应该为字符串
// 这时，我们可以使用重载定义多个 reverse 的函数类型
// 上例中，我们重复定义了多次函数 reverse，前几次都是函数定义，最后一次是函数实现。
function reverse(x: number): number;
function reverse(x: string): string;
function reverse(x: number | string): number | string {
  if (typeof x === "number") {
    return Number(x.toString().split("").reverse().join());
  } else {
    return x.split("").reverse().join();
  }
}
