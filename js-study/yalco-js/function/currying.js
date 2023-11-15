/**
 * 커링
 */

// 기존의 코드
function addMultSubt (a, b, c, d) {
    return (a + b) * c - d;
}

const addMultSubt2 = (a, b, c, d) => (a + b) * c - d;

console.log(
    addMultSubt(2, 3, 4, 5),
    addMultSubt2(2, 3, 4, 5),
);


// ⭐ 커링으로 작성된 함수
function curryAddMultSubt (a) {
    return function (b) {
        return function (c) {
            return function (d) {
                return (a + b) * c - d;
            }
        }
    }
}

const curryAddMultSubt2 = a => b => c => d => (a + b) * c - d;

console.log(
    curryAddMultSubt(2)(3)(4)(5),
    curryAddMultSubt2(2)(3)(4)(5)
);

const curryAddMultSubtFrom2 = curryAddMultSubt(2);
const curryMultSubtFrom5 = curryAddMultSubt(2)(3);
const currySubtFrom20 = curryAddMultSubt(2)(3)(4);

console.log(curryAddMultSubtFrom2);
console.log(curryMultSubtFrom5);
console.log(currySubtFrom20);
// 화살표 함수로 바꾸어 다시 실행해 볼 것

console.log(
    curryAddMultSubtFrom2(3)(4)(5),
    curryMultSubtFrom5(4)(5),
    currySubtFrom20(5)
);
