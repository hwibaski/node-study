/**
 * Abstract Class
 *
 * 그 자체는 인스턴스화 할 일 없지만 메서드나 프로퍼티들을 공유하고 싶을 때 사용
 */

abstract class ModelWithId {
    id: number;

    constructor(id: number) {
        this.id = id;
    }
}

// 추상 클래스는 인스턴스화 불가
// const modelWithId = new modelWithId(123);

class Product extends ModelWithId {

}

const product = new Product(1);
product.id;

abstract class ModelWithAbstractMethod {
    abstract shout(name : string): string;
}

class Person extends ModelWithAbstractMethod {
    shout(name: string): string {
        return "";
    }
}
