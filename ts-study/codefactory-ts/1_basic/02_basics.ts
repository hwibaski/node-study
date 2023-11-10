/**
 * Types
 */

let helloText = 'Hello';
// helloText = true;

/**
 * JS에 존재하는 type
 * 7개의 타입
 */
const stringVar: string = 'string';
const numberVar: number = 3;
const bitIntVar: bigint = BigInt(999999); // es2020
const booleanVar: boolean = true;
const symbolVar: symbol = Symbol(1);
const nullVar: null = null;
const undefinedVar: undefined = undefined;

/**
 * TS에만 존재하는 타입
 */

/**
 * any
 * - 다른 어떠한 type에도 할당 가능
 */
let anyVar: any;
anyVar = '코드팩토리';
anyVar = true;

let testNumber: number = anyVar;
let testString: string = anyVar;
let testBoolean: boolean = anyVar;

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

let unknownVar: unknown;
unknownVar = '코드팩토리';
unknownVar = true;

// let testNumber2: number = unknownVar;
// let testString2: string = unknownVar;
// let testBoolean2: boolean = unknownVar;
let unknownType2: unknown = unknownVar;
let anyType2: any = unknownVar;

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

const koreanGirlGroup: string[] = ['아이브', '블랙핑크'];
const booleanList: boolean[] = [true, false, false, true];
