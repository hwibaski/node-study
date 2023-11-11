/**
 * Nested Object
 */

type NestedPerson = {
    identity: {
        name: string;
        age: number;
    },
    nationality: string;
}

const codefactory: NestedPerson = {
    identity: {
        name: 'code',
        age: 32
    },
    nationality: '한국인'
}

// 한 번에 중첩된 객체의 타입을  선언하는게 좋을까? 아니면 객체를 쪼개서 type을 선언하는게 좋을까?
// 당연하게도 쪼개서 선언하는게 좋다. why? 재사용성, 관심사의 분리

type TPerson = {
    identity: TPersonIdentity,
    nationality: string;
}

type TPersonIdentity = {
    name: string;
    age: number;
}

const iu: TPerson = {
    identity: {
        name: '아이유',
        age: 32,
    },
    nationality: 'korea'
}

interface IPerson {
    identity: IPersonIdentity;
    nationality: string;
}

interface IPersonIdentity {
    name: string;
    age: number;
}

const yuJin: IPerson = {
    identity: {
        name: '안유진',
        age: 22
    },
    nationality: '한국인'
}
