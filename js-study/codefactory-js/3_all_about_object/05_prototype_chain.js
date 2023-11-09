/**
 * Prototype
 */

const testObj = {};

/**
 * '__proto__' 모든 객체에 존재하는 프로퍼티
 * 객체.__proto__는 부모.prototype 을 가리킨다.
 * class 강의에서 배울 때 상속에서 부모 클래스에 해당되는 값
 */
console.log(testObj.__proto__);
// [Object: null prototype] {}

function IdolModel(name, year) {
    this.name = name;
    this.year = year;
}

console.log(IdolModel.prototype);
// {}

console.dir(IdolModel.prototype, {showHidden: true});
// <ref *1> {
//     [constructor]: [Function: IdolModel] {
//         [length]: 2,
//         [name]: 'IdolModel',
//         [arguments]: null,
//         [caller]: null,
//         [prototype]: [Circular *1]
//     }
// }

// 순환 참조
console.log(IdolModel.prototype.constructor === IdolModel);
// true
console.log(IdolModel.prototype.constructor.prototype === IdolModel.prototype);
// true

const yuJin = new IdolModel('안유진', 2003);
console.log(yuJin.__proto__);
// {}
console.log(yuJin.__proto__ === IdolModel.prototype);
// true
console.log(testObj.__proto__ === Object.prototype);
// true

console.log(IdolModel.__proto__ === Function.prototype);
// true

console.log(Function.prototype.__proto__ === Object.prototype);
// true

console.log(IdolModel.prototype.__proto__ === Object.prototype);
// true

// yujin 객체는 어떻게 toString()을 가지고 있나?
// 정의하지도 않았는데.
console.log(yuJin.toString());
// [object Object]

// Object의 prototype에 정의되어 있음.
// 상속을 받을 때는 부모의 프로퍼티랑 메서드를 사용할 수 있다.
console.log(Object.prototype.toString());
// [object Object]


function IdolModel2(name, year) {
    this.name = name;
    this.year = year;

    this.sayHello = function () {
        return `${this.name}이 인사를 합니다.`;
    }
}

const yuJin2 = new IdolModel2('안유진', 2003);
const wonYoung2 = new IdolModel2('장원영', 2002);

console.log(yuJin2.sayHello());
// 안유진이 인사를 합니다.
console.log(wonYoung2.sayHello());
// 장원영이 인사를 합니다.
console.log(yuJin2.sayHello === wonYoung2.sayHello);
// false, 각 객체마다 sayHello() 라는 객체를 가지고 있다.
// 같은 기능인데 따로 메모리를 할당함 -> 비효율적

/**
 * 객체.hasOwnProperty()
 * 상속받은 프로퍼티인지, 객체가 가지고 있는 고유한 프로퍼티인지 확인 가능
 */
console.log(yuJin2.hasOwnProperty('sayHello'));
// true

function IdolModel3(name, year) {
    this.name = name;
    this.year = year;
}

// IdolModel3.prototype에 정의한다.
// IdolModel3.prototype은 IdolModel3로 생성한 객체들이 모두 참조하는 객체이므로 상속 가능
IdolModel3.prototype.sayHello = function () {
    return `${this.name}이 인사를 합니다.`;
}

const yuJin3 = new IdolModel3('안유진', 2003);
const wonYoung3 = new IdolModel3('장원영', 2004);

console.log(yuJin3.sayHello());
console.log(wonYoung3.sayHello());

console.log(yuJin3.sayHello === wonYoung3.sayHello);
// true

console.log(yuJin3.hasOwnProperty('sayHello'));
// false


/**
 * static method
 */

IdolModel3.sayStaticHello = function () {
    return '안녕하세요 저는 static method 입니다.';
}

console.log(IdolModel3.sayStaticHello());

/**
 * Overriding
 */
function IdolModel4(name, year) {
    this.name = name;
    this.year = year;

    this.sayHello = function () {
        return '안녕하세요 저는 인스턴스 메서드입니다!';
    }
}

IdolModel4.prototype.sayHello = function () {
    return '안녕하세요 저는 prototype 메서드입니다!';
}

const yuJin4 = new IdolModel4('안유진', 2003);

// 프로퍼티 셰도잉 - class에서 override
// prototype에 sayHello 정의했지만 실제 인스턴스에 sayHello 있으므로 오버라이드됨
console.log(yuJin4.sayHello());
// 안녕하세요 저는 인스턴스 메서드입니다!

/**
 * getPrototypeOf, setPrototypeOf
 *
 * 인스턴스의 __proto__ 변경 vs 함수의 prototype 변경
 */
function IdolModel(name, year) {
    this.name = name;
    this.year = year;
}

IdolModel.prototype.sayHello = function () {
    return `${this.name} 인사를 합니다.`;
}

function FemaleIdolModel(name, year) {
    this.name = name;
    this.year = year;

    this.dance = function(){
        return `${this.name}가 춤을 춥니다.`;
    }
}

const gaEul = new IdolModel('가을', 2004);
const ray = new FemaleIdolModel('레이', 2004);

console.log(gaEul.__proto__);
// { sayHello: [Function (anonymous)] } -> IdolModel.prototype
console.log(gaEul.__proto__ === IdolModel.prototype);
// true
console.log(Object.getPrototypeOf(gaEul) === IdolModel.prototype);
// true
console.log(Object.getPrototypeOf(gaEul) === gaEul.__proto__);
// true
// Object.getPrototypeOf() 는 객체.__proto__와 같다.

console.log(gaEul.sayHello());
// 가을 인사를 합니다
console.log(ray.dance());
// 레이가 춤을 춥니다.
console.log(Object.getPrototypeOf(ray) === FemaleIdolModel.prototype);
// true
// 당연하게도 ray는 sayHello() 메서드가 없고 ray의 prototype은 FemailIdolModel이므로 sayHello() 메서드가 없다
// console.log(ray.sayHello());

// ray의 프로토타입을 IdolModel.prototype으로 변경 가능
// 상속 구도를 바꿀 수 있다.
Object.setPrototypeOf(ray, IdolModel.prototype);
console.log(ray.sayHello());

console.log(ray.constructor === FemaleIdolModel); // false
console.log(ray.constructor === IdolModel); // true
console.log(gaEul.constructor === IdolModel); // true
console.log(Object.getPrototypeOf(ray) === FemaleIdolModel.prototype); // false
console.log(Object.getPrototypeOf(ray) === IdolModel.prototype); // true
console.log(FemaleIdolModel.prototype === IdolModel.prototype); // false

/**
 * ray와 FemaleIdolModel의 관계가 끊어지고 ray와 IdolModel 관계가 새로 만들어짐
 */

FemaleIdolModel.prototype = IdolModel.prototype;

const eSeo = new FemaleIdolModel('이서', 2007);
console.log(Object.getPrototypeOf(eSeo) === FemaleIdolModel.prototype);
// true, FemaleIdolModel으로 생성했으므로 ok
console.log(FemaleIdolModel.prototype === IdolModel.prototype);
// true, IdolModel.prototype = FemaleIdolModel.prototype했으므로 ok

/**
 *  ray 객체 생성 후에 setPrototypeOf(ray, IdolModel.prototype) 했을 때는
 *  console.log(Object.getPrototypeOf(ray) === FemaleIdolModel.prototype); -> false 나옴
 *
 *  객체를 생성 전에 프로토타입 바꾸는 거랑 객체를 생성 후에 프로토타입 바꾸는게 조금 다르다는거임
 */
