/**
 * 함수 더 알아보기
 */

// 1) 중첩된 함수

function outer () {
    const name = '바깥쪽'
    console.log(name, '함수');

    function inner () {
        const name = '안쪽'
        console.log(name, '함수');
    }
    inner();
}

outer();

function addMulSub (x, y) {
    const add = (a, b) => a + b;
    const sub = (a, b) => a - b;
    const mul = (a, b) => a * b;

    return sub(mul(add(x, y), y), y);
}

console.log(addMulSub(8, 3));

// 2) 재귀 함수

function upto5 (x) {
    console.log(x);
    if (x < 5) {
        upto5(x + 1);
    } else {
        console.log('- - -');
    };
}

upto5(1);
upto5(3);
upto5(7);

// 3) 즉시 실행 함수

// Immideately Invoked Function Expression
// 오늘날에는 잘 사용되지 않음 - 과거 코드 분석을 위해...

(function () {
    console.log('IIFE');
})();

// var를 전역적으로 사용하는 것을 막기 위해 IIFE를 사용했음

const initialMessage = (function () {
    // ⚠️ var를 사용함에 주목
    var month = 8;
    var day = 15;
    var temps = [28, 27, 27, 30, 32, 32, 30, 28];
    var avgTemp = 0;
    for (const temp of temps) {
        avgTemp += temp
    }
    avgTemp /= temps.length;

    return `${month}월 ${day}일 평균기온은 섭씨 ${avgTemp}도입니다.`;
})();

console.log(initialMessage);
console.log(month);

//  그러나 const, let, block scope 등장 이후로 위의 기법은 사용되지 않음

let initialMessage;

{
    const month = 8;
    const day = 15;
    const temps = [28, 27, 27, 30, 32, 32, 30, 28];
    let avgTemp = 0;
    for (const temp of temps) {
        avgTemp += temp
    }
    avgTemp /= temps.length;

    initialMessage = `${month}월 ${day}일 평균기온은 섭씨 ${avgTemp}도입니다.`;
};

console.log(initialMessage);
console.log(month); // 새로고침 후 const를 var로 바꾸고 실행해볼 것

// 4) 불변성

let x = 1;
let y = {
    name: '홍길동',
    age: 15
}
let z = [1, 2, 3];

function changeValue (a, b, c) {
    a++;
    b.name = '전우치';
    b.age++;
    c[0]++;

    console.log(a, b, c);
}

changeValue(x, y, z);

/**
 * 원시 타입 : 인자로 들어간 함수 내에서의 변경에 영향 받지 않음
 *   - 실제 값이 아니라 복사된 값이 들어갔기 때문
 * 참조 타입 : 인자로 들어간 함수 내에서 요소가 변하면 실제로도 변함
 *   - 복사된 값도 같은 객체나 배열을 가리키기 때문
 *
 *   ⭐️ 함수에 주어진 인자를 변경하는 것은 좋지 않음
 *      - ⚠️ 외부의 환경을 변경하는 함수는 위험!
 *      - 이상적인 함수: 받은 값들만 처리하여 새 값을 반환
 */
