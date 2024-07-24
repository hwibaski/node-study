/**
 * 참고
 * https://refactoring.guru/ko/design-patterns/factory-method
*/

/**
 * Creator 클래스는 Product 클래스의 객체를 반환하는 팩토리 메서드를 선언합니다.
 * Creator의 하위 클래스(ConcreteCreator1, ConcreteCreator2)는 이 메서드의 구현을 제공합니다.
 */
abstract class Creator {
    public abstract factoryMethod(): Product;

    public someOperation(): string {
        const product = this.factoryMethod();
        return `Creator: The same creator's code has just worked with ${product.operation()}`;
    }
}

/**
 * ConcreteCreator1과 ConcreteCreator2는 Creator 클래스의 하위 클래스입니다.
 * 이 클래스들은 factoryMethod 메서드를 구현하여 각각의 제품 클래스(ConcreteProduct1, ConcreteProduct2)의 인스턴스를 반환합니다.
 */
class ConcreteCreator1 extends Creator {
    public factoryMethod(): Product {
        return new ConcreteProduct1();
    }
}

class ConcreteCreator2 extends Creator {
    public factoryMethod(): Product {
        return new ConcreteProduct2();
    }
}

/**
 * Product 인터페이스는 팩토리 메서드가 반환하는 객체의 인터페이스를 선언합니다.
 */
interface Product {
    operation(): string;
}

/**
 * ConcreteProduct1과 ConcreteProduct2는 Product 인터페이스를 구현합니다.
 */
class ConcreteProduct1 implements Product {
    public operation(): string {
        return '{Result of the ConcreteProduct1}';
    }
}

class ConcreteProduct2 implements Product {
    public operation(): string {
        return '{Result of the ConcreteProduct2}';
    }
}

/**
 * clientCode 함수는 Creator 인터페이스를 사용하여 작업을 수행합니다.
 * 이 함수는 Creator의 구체적인 클래스를 알지 못하더라도 Creator의 인스턴스를 사용할 수 있습니다.
 */
function clientCode(creator: Creator) {
    // ...
    console.log('Client: I\'m not aware of the creator\'s class, but it still works.');
    console.log(creator.someOperation());
    // ...
}

/**
 * Application은 구성 또는 환경에 따라 크리에이터의 유형을 선택합니다.
 */
console.log('App: Launched with the ConcreteCreator1.');
clientCode(new ConcreteCreator1());
console.log('');

console.log('App: Launched with the ConcreteCreator2.');
clientCode(new ConcreteCreator2());