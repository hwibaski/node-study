/**
 * Type vs Interface
 *
 * Type은 되는데 Interface는 안되는거
 * Interface는 되는데 Type은 안되는 것들이 있다.
 */

// Object 선언할 때
interface IObject {
    x: number;
    y: number;
}

type TObject = {
    x: number;
    y: number;
}

// function을 선언할 때
interface IFunction {
    (x: number, y: number) : number;
}

type TFunction = (x: number, y: number) => number;

/**
 * Type에서는 할 수 있지만
 * interface에서는 할 수 없는 것들
 */

// (1) primitive type 선언하기
type Name = string;

// (2) union 타입 선안하기
type UnionType = string | number;

// 인터페이스는 내부 프로퍼티 정의할 때만 유니언 사용 가능
interface UnionInterface{
    name: string | undefined;
}

// (3) primitive list 또는 tuple 타입 선언하기
type TupleType = [number, string];

/**
 * interface는 흘 수 있고
 * type은 못하는 것
 */

// (1) interface merging
// 같은 이름의 interface를 선언하면 인터페이스 끼리 합쳐진다.
interface  IRectangle {
    height: number;
}

interface  IRectangle {
    width: number;
}

let rectangle: IRectangle = {
    height: 10,
    width: 10
}

class Review {
    // 프로퍼티
    getY = (x: number) => x;

    // 메서드
    getX(x: number) {
        return x;
    }
}

interface GetXnY {
    getX: (x: number) => number;
    getY: (y: number) => number;
}

interface GetXnY {
    getX: (x: number) => number;
    // getY: (y: string) => number; // 프로퍼티라서 오버로딩이 안되기 때문에 머징 안됨
}

interface GetXnY2 {
    getX(x: number): number;
    getY(y: number): number;
}

interface GetXnY2 {
    getX(x: number): number;
    getY(y: string): number; // 메서드는 오버로딩이 되기 때문에 가능해진다.
}

const testMethod: GetXnY2 = {
    getX(x: number): number {
        return x;
    },
    // y가 string | number 타입이된다.
    getY(y): number {
        return 1;
    }
}
