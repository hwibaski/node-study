/**
 * Defining Function
 */

function  printName(name: string) {
    console.log(name);
}

function returnTwoCouples(person1: string, person2: string) {
    return `${person1}과 ${person2}는 사귀고 있습니다.`;
}

console.log(returnTwoCouples('a', 'b'));

/**
 * Optional Parameter
 */
function multiplyOrReturn(x: number, y?: number) {
    if (y) {
        return x * y;
    } else {
        return x;
    }
}

console.log(multiplyOrReturn(10, 20));
console.log(multiplyOrReturn(10));

function multiplyOrReturn2(x:number, y: number = 20) {
    return x * y;
}

console.log(multiplyOrReturn2(10));
console.log(multiplyOrReturn2(10, 30));

/**
 * 나머지 매개변수
 */

function getInfiniteParameters(...args: string[]) {
    return args.map(x => `좋아 ${x}`);
}

console.log(getInfiniteParameters('JS', 'TS'));
// console.log(getInfiniteParameters(1));

/**
 * Return Type
 */
function addTwoNumber(x: number, y: number) {
    return x + y;
}

addTwoNumber(10, 20);

function randomNumber() {
    return Math.random() > 0.5 ?
        10 : 'random';
}

function subtractTwoNumber(x: number, y: number): number {
    return x + y;
}

const subtractTwoNumbersArrow = (x: number, y:number): number => {
    return x - y;
}

/**
 * 특수 반환 타입
 *
 * void / never
 */
function  doNotReturn(): void {
    console.log('저는 반환하지 않습니다.');
}

doNotReturn();

// 함수가 끝나지 않는 상황은 never 타입 사용 가능
function throwError(): never {
    while (true) {

    }
}

function throwError2(): never {
    throw Error();
}
