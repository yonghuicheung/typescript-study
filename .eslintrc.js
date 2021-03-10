/*
 * @Description:
 * @Autor: zhangyonghui
 * @Date: 2021-03-08 15:21:11
 * @LastEditors: zhangyonghui
 * @LastEditTime: 2021-03-10 17:02:33
 */
module.exports = {
  extends: ["alloy", "alloy/typescript"],
  env: {
    // 您的环境变量（包含多个预定义的全局变量）
    // Your environments (which contains several predefined global variables)
    //
    // browser: true,
    // node: true,
    // mocha: true,
    // jest: true,
    // jquery: true
  },
  globals: {
    // 您的全局变量（设置为 false 表示它不允许被重新赋值）
    // Your global variables (setting to false means it's not allowed to be reassigned)
    //
    // myGlobal: false
  },
  rules: {
    // 自定义您的规则
    // Customize your rules
    // "prefer-const": 2,
    "@typescript-eslint/no-inferrable-types": "off", // 关闭类型推断
    "no-undef-init": 0,
    "@typescript-eslint/no-invalid-void-type": 0,
    "@typescript-eslint/prefer-function-type": 0,
    "no-new-wrappers": 0,
    "@typescript-eslint/consistent-type-assertions": 0,
    "@typescript-eslint/explicit-member-accessibility": 0,
    "@typescript-eslint/no-useless-constructor": 0,
    "@typescript-eslint/no-parameter-properties": 0,
  },
};
