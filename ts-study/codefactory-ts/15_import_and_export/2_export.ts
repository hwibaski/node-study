/**
 * Export
 */

export class IdolModel {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

export const number = 999;

export interface ICat {
    name: string;
}

export default {
    name: '코드 팩토리'
}
