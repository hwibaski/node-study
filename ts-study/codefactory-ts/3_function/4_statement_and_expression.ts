/**
 * Statement and Expression
 */

// statement (문장)
function addTwoNumbers(x: number, y: number) {
    return x + y;
}

// expression (표현식)
const addTwoNumbersExp = (x: number, y: number) => {
    return x + y;
}

/**
 * Statement
 * 파라미터, 리턴타입을 매번 작서해야한다.
 * 타입의 재사용성이 떨어진다.
 */

function add(x: number, y: number): number {
    return x + y;
}

function subtract(x: number, y: number): number {
    return x + y;
}

/**
 * Expression
 * 함수에 대한 타입을 지장하면 하나하나 타입을 명시해주지 않아도 된다.
 */
type CalculationType = (x: number, y: number) => number;
const add2: CalculationType = function (x, y) {
    return x + y
}

const subtract2: CalculationType = function (x, y) {
    return x + y
}
