/**
 * Class as Type and Value
 *
 * TS에서의 클래서는 타입이 될 수도 있고 값이 될 수도 있다.
 */

class Dog {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    bark() {
        return `${this.name}이 짖습니다.`
    }
}

let ori = new Dog('오리');
console.log(ori.bark());

ori = {
    name: '오리2',
    bark(): string {
        return '이게 되네?'
    }
};
