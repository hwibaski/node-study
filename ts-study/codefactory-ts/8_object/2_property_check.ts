/**
 * Property Check
 *
 * 초과 속성 검사
 */

type TName = {
    name: string;
}

type TAge = {
    age: number;
}

// const iu1: TName = {
//     name:'아이유',
//     age: 30, // TName 에는 age가 정의되어 있지 않기 때문에 에러 발생
// }

const iu = {
    name:'아이유',
    age: 30,
}

// 그러나 이미 생성된 객체를 TName에 할당할 때는 에러 발생하지 않음 -> iu가 name 프로퍼티 가지고 있기 때문에 가능
// 실제 JS 객체는 물론 age 프로퍼티를 가지고 있다.
// 그러나 TS 상에서는 narrowing 이 적용된다.
const testName: TName = iu;
