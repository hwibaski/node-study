/**
 * 평가
 *
 * - 코드가 계산(Evaluation) 되어 값을 만드는 것
 */

const log = console.log;

 // 1 + 2 -> 3
// [1, 2 + 3] -> [1, 5]

/**
 * 일급
 *
 * - 값으로 다룰 수 있다.
 * - 변수에 담을 수 있다.
 * - 함수의 인자로 사용될 수 있다.
 * - 함수의 결과로 사용될 수 있다.
 */

const variable = 10;
const add10 = a => a + 10;
add10(variable);
const r = add10(variable);

/**
 * 일급 함수
 * - JS에서 함수는 일급이다.
 * - 함수를 값으로 다룰 수 있다.
 * - 조합성과 추상화의 도구
 */

const add5 = a => a + 5;
function outerFunc() {
    return add5;
}

const f1 = () => () => 1;
console.log(f1()());

const f2 = f1();
console.log(f2());

/**
 *  고차 함수
 *  - 함수를 값으로 다루는 함수
 *
 *  1) 함수를 인자로 받아서 실행해주는 함수
 *  2) 함수를 만들어서 리턴하는 함수
 */

// 1) 함수를 인자로 받아서 실행해주는 함수

// 1-1. 화살표 함수 방식
const apply1 = f => f(1);

// 1-2. 함수 선언 방식
function apply2(func) {
    func();
}

const add2 = a => a + 2;
console.log(apply1(add2));
console.log(apply1(a => a - 1));

const times = (f, n) => {
    let i = -1;
    while (++i < n) {
        f(i);
    }
}

times(log, 3);
times(a => log(a + 10), 3);

// 2) 함수를 만들어서 리턴하는 함수 (클로저를 만들어 리턴하는 함수)

const addMaker = a => b => a + b;
const add20 = addMaker(20);
log(add20); // b => a + b;
log(add20(10)); // 30
