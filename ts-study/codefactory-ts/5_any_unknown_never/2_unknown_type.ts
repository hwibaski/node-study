/**
 * Unknown Type
 *
 * any 보다 조금 덜 관대한 타입
 * unknown 타입에는 어떠한 타입의 변수도 할당이 가능
 * 그러나 다른 타입의 변수에는 unknown type을 할당할 수는 없다 (any, unknown type 제외)
 */

// -------------any------------------------

let anyValue: any;

anyValue = 24;
anyValue = '아이유'
anyValue = false;
anyValue = [];
anyValue = {};
anyValue = null;
anyValue = undefined;

// let anyType: any = anyValue;
// let unknownType: unknown = anyValue;
// let booleanType: boolean = anyValue;
// let arrayType: string[] = anyValue;
// let objectType: {} = anyValue;
// let nullType: null = anyValue;
// let undefinedType: undefined = anyValue;

anyValue.toUpperCase();
anyValue.name;
new anyValue();

// ------------unknown----------------------

let unknownValue: unknown;

unknownValue = 24;
unknownValue = '아이유'
unknownValue = false;
unknownValue = [];
unknownValue = {};
unknownValue = null;
unknownValue = undefined;

let anyType: any = unknownValue;
let unknownType: unknown = unknownValue;
let booleanType: boolean = unknownValue;
let arrayType: string[] = unknownValue;
let objectType: {} = unknownValue;
let nullType: null = unknownValue;
let undefinedType: undefined = unknownValue;

unknownValue.toUpperCase();
unknownValue.name;
new unknownValue();

function isString(target: unknown): target is string {
    return typeof target === 'string';
}

let testVal: unknown;

if (isString(testVal)) {
    testVal;
}

/**
 * Union Type
 *
 * unknown과 다른 모든 타입을 union 하면 unknown으로 반환된다
 * 그러나 any와 union하면 any가 반환된다.
 */
type uOrString = unknown | string; // unknown
type uOrBoolean = unknown | boolean; // unknown
type uOrNumber = unknown | number; // unknwon
type uOrAny = unknown | any; // any
type anyOrU = any | unknown; // any

/**
 * Intersection Type
 *
 * unknown & 다른 타입 -> 다른 타입
 */

type uAndString = unknown & string;
type uAndBoolean = unknown & boolean;
type uAndNumber = unknown & number;
type uAndAny = unknown & any;
type anyAndU = any & unknown;

/**
 * Operator 사용
 */
let number1: unknown = 10;
let number2: unknown = 20;

// 모르는 타입이기 때문에 연산 불가
// number1 + number2;
// number1 - number2;
// number1 * number2;
// number1 / number2;

// 아래의 4가지는 사용 가능
number1 === number2
number1 == number2;
number1 !== number2;
number1 != number2
