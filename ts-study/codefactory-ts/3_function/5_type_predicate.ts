/**
 * Type Predicate
 */

// 1) type predicate `is` 사용
function isNumber(input: any): input is number {
    return typeof input === 'number';
}

console.log(isNumber(10));

// 2)  type predicate 미사용
function isNumberReturnBool(input: any): boolean {
    return typeof input === 'number';
}

/**
 * type predicate를 사용했을 때는 Type Narrowing이 가능해진다.
 */

let number: any = 5;

if (isNumberReturnBool(number)) {
    number // any;
}

if (isNumber(number)) {
    number // number
}

interface  Doge {
    name: string;
    age: number;
}

interface  Cat {
    name: string;
    breed: string;
}

type DogeOrCat = Doge | Cat;

function isDoge(animal: DogeOrCat): animal is Doge {
    return (animal as Doge).age !== undefined;
}

const doge: DogeOrCat = Math.random() > 0.5 ? {
    name: '도지',
    age: 32,
} : {
    name:'냥이',
    breed: '코리안 길냥이'
}

if (isDoge(doge)) {
    doge; // Doge type
} else {
    doge; // Cat type
}
