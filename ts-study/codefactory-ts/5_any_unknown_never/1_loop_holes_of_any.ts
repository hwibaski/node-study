/**
 * Loopholes of Any
 */

let number: number;
number = 10;

// (number as any).toUpperCase();

const multiplyTwo = (x: number, y: number) => {
    return x * y;
}

let args1: any = '코드팩토리';
let args2: any = true;

// any 타입은 어떠한 타입의 파라미터에 넣어도 컴파일 에러가 안난다.
multiplyTwo(args1, args2);

let iu: any = {name: '아이유', age: 30};

const callbackRunner = (x: number, y: number, callback: any) => {
    return callback(x, y);
}

const callback = (x: number, y: number) => {
    return x * y;
}

console.log(callbackRunner(5, 4, callback));

// 의도와 다르게 사용 가능하게 된다.
// 에러가 나는 상황에 대해서도 알림을 받을 수 없다.
const callbackMiss =(x: number) => {
    return x;
}

console.log(callbackRunner(5, 4, callbackMiss));
