/**
 * Override
 */

class Parent {
    shout(name: string) {
        return `${name}야 안녕!`;
    }
}

class WrongChild extends Parent {
    // override 시 규칙
    // 1) 부모 메서드와 반환 타입이 일치해야한다.
    // 2) 부모 메서드에 필수인 파라미터들이 존재해야한다.
    // 3) 부모 메서드에서 optional인 파리미터들이 자식에서 필수로 지정되면 안된다.
    // shout() {
    // }
}

class Child extends Parent {


    shout(name: string, me?: string): string {
        if (!me) {
            return super.shout(name);
        } else {
            return super.shout(name) + ` 내 이름은 ${me}야!`
        }
    }
}

const child = new Child();
console.log(child.shout('아이유'));
console.log(child.shout('아이유', '코드팩토리'));

/**
 * 속성 override
 *
 * override 시 넓은 타입에서 좁은 타임으로는 가능 그 반대는 안됨
 */

class PropertyParent {
    name?: string | number;

    constructor(name: string | number) {
        this.name = name;
    }
}

// class WrongPropertyChild extends PropertyParent {
//     name: number;
//
//     constructor(name: number) {
//         this.name = name;
//     }
// }

class PropertyChild extends PropertyParent {
    name: string;

    constructor(name: string) {
        super(name);
        this.name = name;
    }
}
