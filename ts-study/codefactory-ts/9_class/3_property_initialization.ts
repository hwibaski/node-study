/**
 * Property Initialization
 */

class Person {
    // 일반적인 필수값 선언
    name: string;

    // 초기값 제공 선언
    age: number = 23;

    // optional 값 선언법
    pet?: string; // 아무것도 할당하지 않을 시 undefined

    // type of undefined 선언
    petAge: number | undefined // 필수적으로 초기화 하지 않아도됨

    constructor(name: string) {
        this.name = name;
    }
}

class RouteStack {
    stack!: string[]; // !을 써서 초기화가 무조건 보장됨을 명시 -> 타입 에러 지울 수 있음

    constructor() {
        this.initialize();
    }

    initialize() {
        this.stack = [];
    }
}

const routeStack = new RouteStack();
console.log(routeStack);
