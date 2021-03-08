/*
 * @Description:
 * @Autor: zhangyonghui
 * @Date: 2021-03-08 15:24:03
 * @LastEditors: zhangyonghui
 * @LastEditTime: 2021-03-08 20:30:35
 */
let createdByNewBoolean: boolean = Boolean(1);
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
// ES6 中的二进制表示法
let binaryLiteral: number = 0b1010;
// ES6 中的八进制表示法
let octalLiteral: number = 0o744;
let notANumber: number = NaN;
let infinityNumber: number = Infinity;
let myName: string = "Tom";
let myAge: number = 25;
// 模板字符串
let sentence: string = `Hello, my name is ${myName}.
I'll be ${myAge + 1} years old next month.`;
function alertName(): void {
  alert("My name is Tom");
}
