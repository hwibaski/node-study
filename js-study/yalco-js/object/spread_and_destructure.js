/**
 * 1. spread
 */

const class1 = {
    a: 1, b: 'A', c: true
};
const class2 = {
    d: { x: 10, y: 100 }, e: [1, 2, 3]
};
const class3 = {
    ...class1, z: 0
}
const class4 = {
    ...class2, ...class3, ...class2.d
}

console.log(class3);
console.log(class4);

// 중복되는 프로퍼티는 뒤의 것이 덮어씀

const class5 = {
    ...{ a: 1, b: 2 },
    ...{ b: 3, c: 4, d: 5 },
    ...{ c: 6, d: 7, e: 8 }
}

console.log(class5);

// 복사의 깊이

// 해당 객체 바로 안쪽의 원시값은 복제하지만 참조값은 같은 값을 가리킴
// 원시값만 있는 객체만 값에 의한 복사 - 얕은 복사
// 복합적인 객체의 완전한 깊은 복사는 이후 배우게 될 것

