/**
 * Property Attribute
 * 프로퍼티에 대한 속성, 프로퍼티의 메타 데이터
 *
 * 1) 데이터 프로퍼티 - 키와 값으로 형성된 실질적 값을 갖고있는 프로퍼티 (우리가 정의하는 프로퍼티)
 * 2) 액세서 프로퍼티 - 자체적으로 값을 갖고 있지 않지만 다른 값을 가져오거나
 *                  설정할때 호출되는 함수로 구성된 프로퍼티
 *                  (예를들면 getter와 setter)
 */
const yuJin = {
    name: '안유진', // 데이터 프로퍼티
    year: 2003,
};

console.log(Object.getOwnPropertyDescriptor(yuJin, 'year'));

/**
 * 1) value - 실제 프로퍼티의 값
 * 2) writable - 값을 수정 할 수 있는지 여부. false로 설정하면 프로퍼티 값을
 *               수정 할 수 없다.
 * 3) enumerable - 열거가 가능한지 여부이다. for...in 룹 등을 사용 할 수 있으면
 *                 true를 반환한다.
 * 4) configurable - 프로퍼티 어트리뷰트의 재정의가 가능한지 여부를 판단한다.
 *                   false 일 경우 프로퍼티 삭제나 어트리뷰트
 *                   변경이 금지된다. 단, writable이 true인 경우
 *                   값 변경과 writable을 변경하는건 가능하다.
 */
console.log(Object.getOwnPropertyDescriptor(yuJin, 'name'));

console.log(Object.getOwnPropertyDescriptors(yuJin)); // 해당 객체가 가지고 있는 모든 프로퍼티 디스크립터 리턴함

const yuJin2 = {
    name: '안유진',
    year: 2003,

    get age(){
        return new Date().getFullYear() - this.year;
    },

    set age(age){
        this.year = new Date().getFullYear() - age;
    }
}

console.log(yuJin2);
console.log(yuJin2.age);

yuJin2.age = 32;
console.log(yuJin2.age);
console.log(yuJin2.year);

console.log(Object.getOwnPropertyDescriptor(yuJin2, 'age'));
// 엑세서 프로퍼티의 디스크립터
// {
//     get: [Function: get age],
//     set: [Function: set age],
//     enumerable: true,
//     configurable: true
// }


Object.defineProperty(yuJin2, 'height', {
    value: 172,
    writable: true,
    enumerable: true,
    configurable: true,
})
// 데이터 프로퍼티의 디스크립터
// { value: 172, writable: true, enumerable: true, configurable: true }

console.log(yuJin2);
console.log(Object.getOwnPropertyDescriptor(yuJin2, 'height'));

yuJin2.height = 180;
console.log(yuJin2);

/**
 * Writable
 * writeable이 true이면 프로퍼티를 수정할 수 있다.
 * false이면 수정이 불가하다.
 * 수정을 시도할 수 있지만 수정되지는 않는다.
 */
Object.defineProperty(yuJin2, 'height', {
    writable:false,
});
console.log(Object.getOwnPropertyDescriptor(yuJin2, 'height'));

console.log('-------------');
yuJin2.height = 172;
console.log(yuJin2);

/**
 * Enumerable
 * false: 객체를 looping 했을 시 해당 프로퍼티는 열거되지 않는다.
 * true: 객체를 looping 했을 시 해당 프로퍼티는 열거된다. (기본값)
 *
 * 그렇다고해서 객체에서 접근이 불가능한 것은 아니다.
 */
console.log(Object.keys(yuJin2));
for(let key in yuJin2){
    console.log(key);
}

Object.defineProperty(yuJin2, 'name', {
    enumerable:false,
});

console.log(Object.getOwnPropertyDescriptor(yuJin2, 'name'));

console.log('-------------');
console.log(Object.keys(yuJin2));
for(let key in yuJin2){
    console.log(key);
}
console.log(yuJin2);
console.log(yuJin2.name);

/**
 * Configurable
 * 기본적으로 프로퍼티들을 변경 불가
 *
 * 예외
 * writable이 true일 때
 * writable을 false로 변경 가능
 * value 변경 가능
 *
 */

Object.defineProperty(yuJin2, 'height', {
    writable: true, // 동시에 바꾸는 것은 가능하다.
    configurable: false,
});
console.log(Object.getOwnPropertyDescriptor(yuJin2, 'height'));

// configurable이 false이기 때문에 해당 프로퍼티의 설정을 바꿀 수 없다.
// 에러 발생
// Object.defineProperty(yuJin2, 'height', {
//     enumerable: false,
// });

yuJin2.height = 172

// writable이 true이면 value는 바꿀 수 있다.
Object.defineProperty(yuJin2, 'height', {
    value: 172,
});

console.log(Object.getOwnPropertyDescriptor(yuJin2, 'height'));

// writable이 true이면 writble은 false로 바꿀 수 잇다.
Object.defineProperty(yuJin2, 'height', {
    writable: false,
});
console.log(Object.getOwnPropertyDescriptor(yuJin2, 'height'));

Object.defineProperty(yuJin2, 'height', {
    writable: true,
});
