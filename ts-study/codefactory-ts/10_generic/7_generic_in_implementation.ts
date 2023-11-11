/**
 * Generic in Implementation
 */

interface Singer <T, V> {
    name: T;
    sing(year: V): void;
}

class Idol implements Singer<string, number> {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    sing(year: number) {
        console.log(`${year} ${this.name}이 노래를 부릅니다.`)
    }
}

const yujin = new Idol('안유진');
yujin.sing(2023);

// 클래스의 제네릭을 구현하는 인터페이스에 넘겨줄 수도 있다.

class Idol2<T, V> implements Singer<T, V> {
    name: T;

    constructor(name: T) {
        this.name = name;
    }

    sing(year: V) {
    }
}

const wonYoung = new Idol2<string, number>('장원영')
wonYoung.sing(2023);
