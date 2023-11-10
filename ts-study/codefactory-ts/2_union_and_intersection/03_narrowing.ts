/**
 * Narrowing
 *
 * Narrowing은 Union 타입에서 더욱 구체적인 타입으로
 * 논리적으로 유추할 수 있게 되는걸 의미한다.
 *
 * number | string 이지만 문자열을 할당했기 때문에 문자열로 타입이 내로잉됨
 */
let numberOrString: number | string = 'Code Factory';
numberOrString;

const decimal = 12.3278;
console.log(decimal.toFixed(2));

// numberOrString.toFixed(2);

/**
 * Narrowing 종류
 *
 * 1) Assignment Narrowing
 * 2) typeof Narrowing
 * 3) Truthiness Narrowing
 * 4) Equality Narrowing
 * 5) in operator Narrowing
 * 6) instanceof narrowing
 * 7) discriminated union narrowing (차별된 유니언 내로잉)
 * 8) exhaustiveness checking
 */

// (1) Assignment Narrowing
// 특정 값을 할당해서 내로잉
let numOrString: number | string = '유히왕';
numberOrString.toString();

// (2) typeof narrowing
numberOrString = Math.random() > 0.5 ? 1123: 'string';

if (typeof  numberOrString === 'string') {
    numberOrString.toString();
} else {
    numberOrString;
}

// (3) Truthiness Narrowing
let nullOrString: null | string[] = Math.random() > 0.5 ? null : ['아이유'];

if (nullOrString) {
    nullOrString.forEach((x) => {});
} else {
    nullOrString // null
}

// (4) Equality Narrowing
let numberOrString2: number | string = Math.random() > 0.5 ? 1123 : '아이유';
let stringOrBool2: string | boolean = Math.random() > 0.5 ? '아이브' : true;

if (numberOrString2 === stringOrBool2) {
    numberOrString2 // string
    stringOrBool2   // string
} else {
    numberOrString2 // number | boolean
    stringOrBool2  // number | boolean
}


let numberOrStringOrNull: number | string | null = Math.random() > 0.5 ? 1123 : Math.random() > 0.5 ? '안유진' : null;

if (typeof numberOrStringOrNull === 'number') {
    numberOrStringOrNull; // number
} else {
    numberOrStringOrNull; // string | null
}

// (5) in operator narrowing
interface Human {
    name: string;
    age: number;
}

interface Dog {
    name: string;
    type: string;
}

let human: Human = {
    name:'안유진',
    age: 23,
}

let dog: Dog = {
    name: '개',
    type: '요크셔테리어'
}

let humanOrDog: Human | Dog = Math.random() > 0.5 ? human : dog;

if ('type' in humanOrDog) {
    humanOrDog // Dog
} else {
    humanOrDog // Human
}

// 6) instanceof narrowing
let dateOfString: Date | string = Math.random() > 0.5 ? new Date() : '코드팩토리';

if (dateOfString instanceof  Date) {
    dateOfString; // Date
} else {
    dateOfString; // string
}

// (7) Discriminated Union Narrowing

/**
 * 아래와 같이 타입을 만들면 제대로 추론이 안됨
 */
interface Animal {
    type: 'dog' | 'human';
    height?: number;
    breed?: string;
}

let animal: Animal = Math.random() > 0.5 ?
    {type: 'human', height: 177} : {type: 'dog', breed: 'Yorkshire Terrier'}

if (animal.type === 'human') {
    animal.height;
} else {
    animal.breed;
    animal.height;
}

interface Human2 {
    type: 'human';
    height: number;
}

interface Dog2 {
    type: 'dog';
    breed: string;
}

type HumanOrDog2 = Human2 | Dog2;

let humanOrDog2: HumanOrDog2 = Math.random() > 0.5 ?
    { type: 'human', height: 177} : {type:'dog', breed: 'Yorkshire Terrier'}

if (humanOrDog2.type === 'human') {
    humanOrDog2; // Human2
} else {
    humanOrDog2; // Dog2
}

// 8) Exhaustiveness checking
switch (humanOrDog2.type) {
    case 'human':
        humanOrDog2; // Human2
        break;
    case 'dog':
        humanOrDog2; // Dog2
        break;
    default:
        humanOrDog2; // never

        // humanOrDog2의 type이 추가될 경우 humanOrDog2가 never 타입이 안되므로
        // 타입체크에서 컴파일 에러가 난다.
        // 그래서 에러를 컴파일 타임에 확인할 수 있다.
        const _check: never = humanOrDog2;
        break;
}
