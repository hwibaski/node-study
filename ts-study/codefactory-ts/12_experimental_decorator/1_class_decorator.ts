/**
 * Class Decorator
 */

@Test
@Frozen
@LogTest('PROD')
@ChangeClass
class Idol {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}


// basic
function Test(constructor: Function) {
    console.log(constructor);  // [class Idol]
}

function Frozen(constructor: Function) {
    Object.freeze(constructor);
    Object.freeze(constructor.prototype);
}

const yuJin = new Idol('안유진', 23);

console.log(Object.isFrozen(Object.getPrototypeOf(yuJin))); // true;

// decorator factory
function LogTest(env: string) {
    return function (constructor: Function) {
        console.log(`[${env}] ${constructor}가 실행됐습니다.`)
    }
}

// [PROD] class Idol {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }
// }가 실행됐습니다.


console.log('--------------------------------------------------')

const wonYoung = new Idol('장원영', 22);
console.log(wonYoung);

/**
 * 클래스에 데코레이터를 적용하면 클래스가 한 번 읽힐 때 실행된다.!!!
 * 추가적으로 인스턴스 생성해도 데코레이터 실행되지 않는다.
 */

function ChangeClass<T extends {new(...args: any[]): {}}>(constructor: T) {
    return class extends constructor {
        groupName= '아이브';

        constructor(...params: any[]) {
            super(...params);

            console.log('constructor instantiated');
        }
    }
}
