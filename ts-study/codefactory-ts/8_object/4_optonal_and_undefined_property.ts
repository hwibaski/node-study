/**
 * Optional and Undefined Property
 *
 * Optional 프로퍼티는 결국 undefined가 되지만
 * Optional(?)을 사용하지 않으면 undefined라고 명시적으로 할당을 해야 한다.
 */

interface Dog {
    name: string;
    age: number;

    // 종을 모르면 undefined로 선언해도 된다! 라는 상황 가정
    breed?: string;
}

const byulE: Dog = {
    name: '별이',
    age: 1,
    breed: '미니핀'
}

const ori: Dog = {
    name: '오리',
    age: 3,
}

/**
 * breed?: string vs breed: string | undefined 의 차이점은?
 */

interface Cat {
    name: string;
    age: number;
    breed: string | undefined;
}

const nabi: Cat = {
    name: '나비',
    age:7,
    breed: undefined // 이렇게 직접 할당을 해줘야된다!
}
