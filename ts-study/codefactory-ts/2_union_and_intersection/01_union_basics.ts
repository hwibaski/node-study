/**
 * Union Basics
 *
 * 유니언은 TS에서 타입을 병할 할 수 있는 수많은 방법중 하나이다.
 */

type StringOrBooleanType = string | boolean;

let stringOrBoolean: StringOrBooleanType = '아이브';
stringOrBoolean = true;

// stringOrBoolean = undefined;

type StrBoolNullType = string | boolean | null;

type StateTypes = 'DONE' | 'LOADING' | 'ERROR';

let state: StateTypes = 'DONE';
state = 'LOADING';
// state = 'INITIAL';

/**
 * 리스트의 유니언
 */

// string으로 구성된 리스트 또는 boolean으로 구성된 리스트
type StringListOrBooleanList = string[] | boolean[];

let strListOrBooleanList: StringListOrBooleanList = [
    '아이유',
    '김고은'
];

strListOrBooleanList = [
    true,
    false,
    true
];

// 이거 안됨
// strListOrBooleanList = [
//     true,
//     'iu',
// ];

type StringOrNumberList = (string | boolean)[];

let stringOrNumberList = [
    true, true, true,
    'iu', '레드벨벳'
]

strListOrBooleanList = [
    true, true, true
]

strListOrBooleanList = [
    'iu',
    '레드벨벳'
]

/**
 * Interface로 사용하는 union
 */

interface Animal {
    name: string;
    age: number;
}

interface Human {
    name:string;
    age: number;
    address: string;
}

type AnimalOrHuman = Animal | Human;

let animalOrHuman: AnimalOrHuman = {
    name: '김휘민',
    age: 33,
    address: '대한민국'
}

// AnimalOrHuman 타입이지만 address 프로퍼티가 있으면 Human 타입이기 때문에 Human으로 추론함
console.log(animalOrHuman); // Human Type
console.log(animalOrHuman.name);
console.log(animalOrHuman.age)
console.log(animalOrHuman.address);

animalOrHuman = {
    name: '오리',
    age: 1,
}

console.log(animalOrHuman); // Animal Type
console.log(animalOrHuman.name);
console.log(animalOrHuman.age);
console.log((animalOrHuman as Human).address); // undefined -> 이렇게 캐스팅 하면 안됨

// 서로 관계가 없는 유니언을 선언하면 어떻게 되는가
// 하나의 타입을 충족하는 프로퍼티가 완성되면 나머지 타입을 충족하는 프로퍼티는 optional 이 된다 .
type Person = {
    name: string;
    age: number;
}

type Cat = {
    breed: string;
    country: string;
}

type PersonOrCat = Person | Cat;

const personOrCat: PersonOrCat = {
    name: 'hwibaski',
    age: 11
}

const personOrCat2: PersonOrCat = {
    breed: 'breed',
    country: 'korea'
}

const personOrCat3: PersonOrCat = {
    name: 'name',
    age: 11,
    country: 'korea'
}

const personOrCat4: PersonOrCat = {
    name: 'name',
    age: 11,
    breed: 'breed',
    country: 'korea'
}

const personOrCat5: PersonOrCat = {
    age: 11,
    breed: 'breed',
    country: 'korea'
}
