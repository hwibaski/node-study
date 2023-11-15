/**
 * 객체의 기본 사용법들
 */

let idx = 0;
const  obj = {
    ['key-' + ++idx]: `value-${idx}`,
    ['key-' + ++idx]: `value-${idx}`,
    ['key-' + ++idx]: `value-${idx}`,
    [idx ** idx]: 'POWER'
}

console.log(obj);

// 객체나 배열을 키 값으로 사용시

const objKey = { x: 1, y: 2 };
const arrKey = [1, 2, 3];

const obj = {
    [objKey]: '객체를 키값으로',
    [arrKey]: '배열을 키값으로'
}

console.log(
    obj[objKey],
    obj[arrKey]
);

// ⚠️ ???????
console.log(
    obj[{ a: 1, b: 2, c: 3 }], // 내용이 다른 객체
    obj['1,2,3'] // 문자열
);

// 로그를 펼쳐 키값을 볼 것 - 💡 문자열임
// 객체와 배열이 그 자체가 아니라 문자열로 치환되어 키가 되는 것
console.log(obj);

console.log(
    obj['[object Object]']
);

/**
 * 즉 실제로 해당 객체나 배열의 내용이나 참조값이 키가 되는 것이 아님
 * 이후 배울 Map ( 참조값을 키값으로 사용 )과의 차이점
 */


// 메서드 정의

// 일반 함수 프로퍼티 정의
const person = {
    name: '홍길동',

    salutate: function (formal) {
        return formal
            ? `안녕하십니까, ${this.name}입니다.`
            : `안녕하세요, ${this.name}이에요.`;
    }
}
console.log(person.salutate(true));

// ⭐️ 메서드 정의
const person = {
    name: '홍길동',

    salutate (formal) {
        return formal
            ? `안녕하십니까, ${this.name}입니다.`
            : `안녕하세요, ${this.name}이에요.`;
    }
}
console.log(person.salutate(true));

//⭐ ES6부터는 위의 표현으로 정의된 함수만 메서드라고 부름
// 일반 함수 프로퍼티와 특성이 다름 - 이후 자세히 배울 것
