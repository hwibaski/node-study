/**
 * Export
 */

// export default는 파일당 한개만 가능
// export default class IdolModel {
//     name:string;
//     age: number;
//
//     constructor(name: string, age: number) {
//         this.name = name;
//         this.age = age;
//     }
// }
//
class IdolModel {
    name:string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

const number =12;
// export default number;


interface ICat {
    name: 1,
}

// interface는 JS에 없기 때문에 안됨
export default {
    IdolModel,
    number,
}
