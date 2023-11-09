/**
 * Immutable Object
 */
const yuJin = {
    name: '안유진',
    year: 2003,

    get age(){
        return new Date().getFullYear() - this.year;
    },

    set age(age){
        this.year = new Date().getFullYear() - age;
    }
}

console.log(yuJin);
// { name: '안유진', year: 2003, age: [Getter/Setter] }

/**
 * Extensible
 * 확장이 가능한지 여부를 설정
 */
console.log(Object.isExtensible(yuJin));
// true

yuJin['position'] = 'vocal';

console.log(yuJin);
// { name: '안유진', year: 2003, age: [Getter/Setter], position: 'vocal' }

Object.preventExtensions(yuJin);

console.log(Object.isExtensible(yuJin));

yuJin['groupName'] = '아이브';
console.log(yuJin);
// groupName 프로퍼티가 생성되지 않았다. 에러를 던지지는 않는다.
// { name: '안유진', year: 2003, age: [Getter/Setter], position: 'vocal' }

delete yuJin['position'];
console.log(yuJin);
// 삭제는 가능
// { name: '안유진', year: 2003, age: [Getter/Setter] }


/**
 * Seal
 * 프로퍼티들의 configurable -> false로 바꿔줌
 * 추가적으로 값을 추가하거나 삭제하제 못한다
 */
console.log('---------------------------seal--------------------------')
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
// { name: '안유진', year: 2003, age: [Getter/Setter] }

console.log(Object.isSealed(yuJin2)); // false

Object.seal(yuJin2);

console.log(Object.isSealed(yuJin2)); // true

yuJin2['groupName'] = '아이브';
console.log(yuJin2);
// { name: '안유진', year: 2003, age: [Getter/Setter] }

delete yuJin2['name'];
console.log(yuJin2);
// 삭제도 안된다.
// { name: '안유진', year: 2003, age: [Getter/Setter] }

Object.defineProperty(yuJin2, 'name', {
    writable: false,
});
console.log(Object.getOwnPropertyDescriptor(yuJin2, 'name'));

// {
//     value: '안유진',
//     writable: false,
//     enumerable: true,
//     configurable: false -> Object.seal()을 했더니 configurable이 false로 바뀜
// }

/**
 * Freezed
 *
 * 읽기 외에 모든 기능을 불가능하게 만든다.
 * extensible -> false
 * writable -> false
 * configurable -> false
 */
console.log('---------------------------freezed--------------------------')
const yuJin3 = {
    name: '안유진',
    year: 2003,

    get age(){
        return new Date().getFullYear() - this.year;
    },

    set age(age){
        this.year = new Date().getFullYear() - age;
    }
}
console.log(Object.isFrozen(yuJin3)); // false

Object.freeze(yuJin3);
console.log(Object.isFrozen(yuJin3)); // true

yuJin3['groupName'] = '아이브';
console.log(yuJin3);

delete yuJin3['name'];
console.log(yuJin3);

// 에러 발생
// Object.defineProperty(yuJin3, 'name', {
//     value: '코드팩토리',
// })

console.log(Object.getOwnPropertyDescriptor(yuJin3, 'name'));
// {
//     value: '안유진',
//     writable: false,
//     enumerable: true,
//     configurable: false
// }

/**
 * Nested 된 object는 freeze되지 않는다.
 * extensible, seal도 마찬가지
 * nested된 객체도 적용하려면 재귀 같은 다른 방법으로 적용해야함
 */
const yuJin4 = {
    name: '안유진',
    year: 2003,
    wonYoung: {
        name: '장원영',
        year: 2002,
    },
};
Object.freeze(yuJin4);

console.log(Object.isFrozen(yuJin4));
console.log(Object.isFrozen(yuJin4['wonYoung']));
