/**
 * Generic in Method
 */

class Idol<T> {
    id: T;
    name: string;


    constructor(id: T, name: string) {
        this.id = id;
        this.name = name;
    }

    sayHello<Time>(logTime: Time) {
        return `${logTime} 안녕하세요. 제 이름은 ${this.name} 입니다.`

    }
}

const yujin = new Idol('a999', '안유진');

console.log(yujin.sayHello('2023'));
console.log(yujin.sayHello(2023));

class Message<T> {
    sayHello<Time>(logTime: Time, message: T) {
        console.log(`logTime : ${typeof logTime} / message: ${typeof message}`)
    }
}

const message = new Message<string>();
message.sayHello<number>(2000, 'hi');

/**
 * 클래스의 제네릭과 메서드의 제니릭이 같은 타입이면 메서드의 제네릭을 따라간다.
 * 헷갈리니까 같은 이름을 쓰지 말자. (가능하다면)
 */
class DuplicatedGenericName<T> {
    sayHello<T>(logTime: T) {
        console.log(`logTime : ${typeof logTime}`)
    }
}

const duplicate = new DuplicatedGenericName<string>();
duplicate.sayHello<number>(123);
