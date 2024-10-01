/**
 * 브릿지 패턴은 추상화와 구현을 분리하여 각각을 독립적으로 확장할 수 있도록 합니다.
 * 이를 통해 추상화와 구현 사이의 결합도를 낮추고, 런타임에 동적으로 변경할 수 있습니다.
 *
 * Abstraction: 추상화 클래스
 */
class Abstraction {
  protected implementation: Implementation;

  constructor(implementation: Implementation) {
    this.implementation = implementation;
  }

  public operation(): string {
    const result = this.implementation.operationImplementation();
    return `Abstraction: Base operation with:\n${result}`;
  }
}

/**
 * 확장된 추상화 클래스
 */
class ExtendedAbstraction extends Abstraction {
  public operation(): string {
    const result = this.implementation.operationImplementation();
    return `ExtendedAbstraction: Extended operation with:\n${result}`;
  }
}

/**
 * Implementation: 구현 인터페이스
 */
interface Implementation {
  operationImplementation(): string;
}

/**
 * ConcreteImplementation: 구체적인 구현 클래스
 */
class ConcreteImplementationA implements Implementation {
  operationImplementation(): string {
    return "ConcreteImplementationA: Here's the result on the platform A.";
  }
}

/**
 * ConcreteImplementation: 구체적인 구현 클래스
 */
class ConcreteImplementationB implements Implementation {
  operationImplementation(): string {
    return "ConcreteImplementationB: Here's the result on the platform B.";
  }
}

/**
 * 클라이언트 코드
 */
function clientCode(abstraction: Abstraction) {
  console.log(abstraction.operation());
}

let implementation = new ConcreteImplementationA();
let abstraction = new Abstraction(implementation);
clientCode(abstraction);

console.log("");

implementation = new ConcreteImplementationB();
abstraction = new ExtendedAbstraction(implementation);
clientCode(abstraction);
