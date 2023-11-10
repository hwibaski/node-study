"use strict";
/**
 * Types
 */
let helloText = 'Hello';
// helloText = true;
/**
 * JS에 존재하는 type
 * 7개의 타입
 */
const stringVar = 'string';
const numberVar = 3;
const bitIntVar = BigInt(999999); // es2020
const booleanVar = true;
const symbolVar = Symbol(1);
const nullVar = null;
const undefinedVar = undefined;
/**
 * TS에만 존재하는 타입
 */
/**
 * any
 * - 다른 어떠한 type에도 할당 가능
 */
let anyVar;
anyVar = '코드팩토리';
anyVar = true;
let testNumber = anyVar;
let testString = anyVar;
let testBoolean = anyVar;
/**
 * unknown
 * - any와 마찬가지로 다른 type에 할당가능
 *
 * any와의 같은점
 * unknown 타입의 변수에 어떠한 type도 할당가능
 *
 * any와 차이점
 * 다른 타입의 변수에 할당 불가능
 */
let unknownVar;
unknownVar = '코드팩토리';
unknownVar = true;
// let testNumber2: number = unknownVar;
// let testString2: string = unknownVar;
// let testBoolean2: boolean = unknownVar;
let unknownType2 = unknownVar;
let anyType2 = unknownVar;
/**
 * never
 * 어떠한 타입도 저장되거나 반환되지 않을 때 사용하는 타입
 */
// let neverType1: never = null;
// let neverType2: never = undefined;
// let neverType3: never = 'test';
/**
 * 리스트 타입
 */
const koreanGirlGroup = ['아이브', '블랙핑크'];
const booleanList = [true, false, false, true];
