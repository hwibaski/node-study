/**
 * 매개변수
 */

// 1) 함수의 매개변수 갯수를 넘어가는 인수
// - 오류를 일으키지 않고 무시됨
function add(a, b) {
    return a + b;
}

console.log(
    add(1, 3),
    add(1, 3, 5),
    add(1, 3, 5, 7)
);

// 2) default parameter
function add2(a = 2, b = 4) {
    console.log(`${a} + ${b}`);
    return a + b;
}

console.log(
    add2(),
    add2(1),
    add2(1, 3)
);

// 3) arguments

// for ... of가 가능한 이유: iterable이기 때문 이후 다룸
// ⚠️ 화살표 함수에서는 arguments 사용 불가! 화살표 함수로 바꾸어 실행해 볼 것

function add3(a, b) {
    console.log('1.', arguments);
    console.log('2.', arguments[0]);
    console.log('3.', typeof arguments);
    return a + b;
}

console.log(
    '4.', add3(1, 3, 5, 7)
);

// 4) rest parameters

// 특정 매개변수들 뒤에 정해지지 않은 수의 매개변수들을 받을 때
// 마지막 인자로만 사용 가능
// arguments와는 달리 실제 배열임

console.log(
    '3.',
    classIntro(3, '김민지', '영희', '철수', '보라')
); // 호이스팅

function classIntro (classNo, teacher, ...children) {
    console.log('1.', children);
    console.log('2.', arguments);

    let childrenStr = '';
    for (const child of children) {
        if (childrenStr) childrenStr += ', ';
        childrenStr += child;
    }
    return `${classNo}반의 선생님은 ${teacher}, `
        + `학생들은 ${childrenStr}입니다.`
}
