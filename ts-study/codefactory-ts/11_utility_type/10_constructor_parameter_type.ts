/**
 * Constructor Parameter
 */

class Idol {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

// [string, number];
type ConstructorParamType = ConstructorParameters<typeof  Idol>;
