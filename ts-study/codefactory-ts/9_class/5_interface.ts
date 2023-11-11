/**
 * Interface in OOP
 *
 * // interface assertion, narrowing 참고
 * https://olegvaraksin.medium.com/narrow-interfaces-in-typescript-5dadbce7b463
 */

interface Animal {
    name: string;
    age: number;
    jump(): string;
}

class Dog implements Animal {
    age: number;
    name: string;

    jump(): string {
        return `${this.name}이 점프를 합니다.`;
    }

    constructor(age: number, name: string) {
        this.age = age;
        this.name = name;
    }
}

let ori: any = new Dog(3, '오리');
ori.jump();

function instanceOfAnimal(object: any): object is Animal {
    return 'jump' in object;
}

if (instanceOfAnimal(ori)) {
    ori; // Animal
}

/**
 * 다중 인터페이스 구현
 */

interface Pet {
    legsCount: number;
    bark(): void;
}

class Cat implements Animal, Pet {
    // Animal
    name: string;
    age: number;

    // Pet
    legsCount: number;
    constructor(age: number, name: string, legsCount: number) {
        this.age = age;
        this.legsCount = legsCount;
        this.name = name;
    }

    jump(): string {
        return '점프';
    }

    // Animal
    bark(): void {
        console.log('야옹')
    }
}

/**
 * type으로 다중 인터페이스 구현과 비슷하게 만들기
 */
type AnimalAndPet = Animal & Pet;

class Cat2 implements AnimalAndPet {
    legsCount: number;
    name: string;
    age: number;

    bark(): void {
    }

    jump(): string {
        return "";
    }

    constructor(legsCount: number, name: string, age: number) {
        this.legsCount = legsCount;
        this.name = name;
        this.age = age;
    }
}

/**
 * 다중 구현 시 interface 끼리의 프로퍼티 중복을 주의해야함
 */

interface  WrongInterface1 {
    name: string;
}

interface  WrongInterface2 {
    name: number;
}

// class Person implements WrongInterface1, WrongInterface2 {
    // name: number | string;
// }


/**
 * 클래스 생성자 타입 지정하기
 */
class Idol {
    name: string;
    age: number;


    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

// new 키워드 선언
interface IdolConstructor {
    new (name: string, age: number):Idol;
}

// IdolConstructor 타입의 생성자가 있는 클래스를 constructor 매개 변수로 받는다!
function createIdol(constructor: IdolConstructor, name: string, age: number) {
    // return new Idol(name, age) 와 같음
    return new constructor(name, age);
}

console.log(createIdol(Idol, '아이유', 32));
