/**
 * Casting
 *
 * TS에서 Casting을 하면 JS에서는 적용이 안된다.
 */

const codefactory = 'code factory';
const testNumber = 3;

console.log(codefactory.toUpperCase());
// console.log(testNumber.toUpperCase());

let sampleNumber: any = 5;
// console.log(sampleNumber.toUpperCase()); // error!!

// 말도 안되지만 string type으로 추론함
// 이대로 코드 실행되면 런타임 때 에러 빵빵 터짐
let stringVar = sampleNumber as string;

// TypeScript에서 캐스팅하는건 JS에서 아무 의미가 없다.
// 백날 캐스팅해도 값에 따라서 타입이 정해진다.
// 따라서 주의해서 캐스팅을 해야 한다.
console.log(typeof  (sampleNumber as string)); // number

let number = 5;

/**
 * 그럼 언제 캐스팅을 사용하냐?
 * 상속 관계에 있을 때 슈퍼 타임을 서브 타입으로
 */
