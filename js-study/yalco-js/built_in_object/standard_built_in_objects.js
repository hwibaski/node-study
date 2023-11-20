/**
 * 표준 빌트인 객체
 *
 * 전역 프로퍼티로 제공됨 - globalThis등을 붙이지 않고 바로 사용 가능
 */

// 그러나 요소들로 갖고 있는 것은 확인 가능
console.log(globalThis.Infinity);
console.log(globalThis.isNaN);
console.log(globalThis.Object);

// 래퍼 객체

const str = 'abcde';
console.log(
    str.length,
    str.toUpperCase(),
    str[0]
);

const num = 123.4567;
console.log(
    typeof num.toString(),
    num.toFixed(2)
);

// 원시값이 어떻게 프로퍼티를 갖고 있을까?
// 원시값을 필요시 래퍼 객체로 감싸서 wrap 그것의 인스턴스로 만들어 기능 실행
// 원시값에서 객체를 사용하듯 해당 래퍼 객체의 프로퍼티를 호출할 때 래핑이 발생

const str2 = new String('abcde');
const num2 = new Number(123.4567);
const bool2 = new Boolean(true);

console.dir(String.prototype);
console.log(typeof str2, str2.__proto__);
console.log(typeof num2, num2);
console.log(typeof bool2, bool2);

// valueOf 함수 - 래퍼 객체의 인스턴스에서 원시값 반환

const str3 = new String('abcde');
const num3 = new Number(123.4567);
const bool3 = new Boolean(true);

console.log(str3.valueOf());
console.log(num3.valueOf());
console.log(bool3.valueOf());
