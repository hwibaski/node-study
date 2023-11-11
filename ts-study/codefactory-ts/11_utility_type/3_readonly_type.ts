/**
 * Readonly Type
 *
 * 해당 객체의 수정을 막는다.
 */

interface Cat {
    name: string;
    age: number;
}

const nyaong: Cat = {
    name: '냐옹이',
    age: 8
}

nyaong.name = '코드팩토리';

const bori: Readonly<Cat> = {
    name: '보리',
    age: 7,
}

// bori.name = '아이유';

Object.freeze(bori);
