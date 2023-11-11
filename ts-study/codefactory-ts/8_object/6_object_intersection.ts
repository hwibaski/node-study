/**
 * Object Interscetion
 */

type PrimitiveIntersection = string & number; // never

type PersonType = {
    name: string;
    age: number;
}

type CompanyType = {
    company: string;
    companyNumber: string;
}

type PersonAndCompany = PersonType & CompanyType;

const jisoo: PersonAndCompany = {
    name: 'jisoo',
    age: 32,
    company: 'YG',
    companyNumber: 'xxxxyyyyzzz'
}

type PetType = {
    petName: string;
    petAge: number;
}

// PersonType : 필수
// CompanyType, PetType : 둘중 하나는 꼭 충족하면 됨, 하나가 충족한다는 가정하에 나머지 프로퍼티가 추가되도 상관없음
type CompanyOrPet = PersonType & (CompanyType | PetType);

const companyOrPet: CompanyOrPet = {
    name: '코드팩토리',
    age: 32,

    // CompanyType
    company: '주식회사 코드팩토리',
    companyNumber: 'xxxxyyyyzzz',

    // PetType
    petName: '오리',
    petAge: 8,
}

// 가능
const companyOrPet2: CompanyOrPet = {
    name: '코드팩토리',
    age: 32,

    // CompanyType
    company: '주식회사 코드팩토리',
    companyNumber: 'xxxxyyyyzzz',

    // PetType
    // petName: '오리',
    // petAge: 8,
}

// 불가능
// const companyOrPet2: CompanyOrPet = {
//     name: '코드팩토리',
//     age: 32,
//
//     // CompanyType
//     company: '주식회사 코드팩토리',
//     // companyNumber: 'xxxxyyyyzzz',
//
//     // PetType
//     petName: '오리',
//     // petAge: 8,
// }

