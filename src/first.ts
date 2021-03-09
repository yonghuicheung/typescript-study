/*
 * @Description:
 * @Autor: zhangyonghui
 * @Date: 2021-03-08 15:24:03
 * @LastEditors: zhangyonghui
 * @LastEditTime: 2021-03-09 20:32:51
 */
// 布尔值
let isDone: boolean = false;
// 使用构造函数 Boolean 创造的对象不是布尔值
// 不能将类型“Boolean”分配给类型“boolean”。
// “boolean”是基元，但“Boolean”是包装器对象。如可能首选使用“boolean”。
// eslint-disable-next-line no-new-wrappers
// let createdByNewBoolean: boolean = new Boolean(1); // error
// new Boolean() 返回的是一个 Boolean 对象
let createdByNewBoolean: Boolean = new Boolean(1); // ok
let createdByBoolean: boolean = Boolean(1); // ok

// 数值
// 其中 0b1010 和 0o744 是 ES6 中的二进制和八进制表示法，它们在target为es5会被编译为十进制数字
let decLiteral: number = 6; // ok
let hexLiteral: number = 0xf00d; // ok
// ES6 中的二进制表示法
let binaryLiteral: number = 0b1010; // ok
// ES6 中的八进制表示法
let octalLiteral: number = 0o744; // ok
let notANumber: number = NaN; // ok
let infinityNumber: number = Infinity; // ok

// 字符串
let myName: string = "Tom"; // ok
let myAge: number = 25; // ok
// 模板字符串
let sentence: string = `Hello, my name is ${myName}.
I'll be ${myAge + 1} years old next month.`; // ok
