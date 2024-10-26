export {};

/**
 * 기본 Component 인터페이스는 데코레이터에 의해 수정될 수 있는 작업을 정의합니다.
 */
interface Component {
  operation(): string;
}

/**
 * 구체적인 컴포넌트는 작업의 기본 구현을 제공합니다. 이러한 클래스의 여러 변형이 있을 수 있습니다.
 */
class ConcreteComponent implements Component {
  public operation(): string {
    return "ConcreteComponent";
  }
}

/**
 * 기본 Decorator 클래스는 다른 컴포넌트와 동일한 인터페이스를 따릅니다.
 * 이 클래스의 주요 목적은 모든 구체적인 데코레이터에 대한 래핑 인터페이스를 정의하는 것입니다.
 * 래핑 코드의 기본 구현은 래핑된 컴포넌트를 저장하기 위한 필드와 초기화 방법을 포함할 수 있습니다.
 */
class Decorator implements Component {
  protected component: Component;

  constructor(component: Component) {
    this.component = component;
  }

  /**
   * 데코레이터는 래핑된 컴포넌트에 모든 작업을 위임합니다.
   */
  public operation(): string {
    return this.component.operation();
  }
}

/**
 * 구체적인 데코레이터는 래핑된 객체를 호출하고 그 결과를 어떤 방식으로든 변경합니다.
 */
class ConcreteDecoratorA extends Decorator {
  /**
   * 데코레이터는 래핑된 객체를 직접 호출하는 대신, 부모 클래스의 작업 구현을 호출할 수 있습니다.
   * 이 접근 방식은 데코레이터 클래스의 확장을 간소화합니다.
   */
  public operation(): string {
    return `ConcreteDecoratorA(${super.operation()})`;
  }
}

/**
 * 데코레이터는 래핑된 객체에 대한 호출 전이나 후에 자신의 동작을 실행할 수 있습니다.
 */
class ConcreteDecoratorB extends Decorator {
  public operation(): string {
    return `ConcreteDecoratorB(${super.operation()})`;
  }
}

/**
 * 클라이언트 코드는 Component 인터페이스를 사용하는 모든 객체와 작업합니다.
 * 이 방식으로 클라이언트 코드는 작업하는 컴포넌트의 구체적인 클래스와 독립적일 수 있습니다.
 */
function clientCode(component: Component) {
  // ...

  console.log(`RESULT: ${component.operation()}`);

  // ...
}

/**
 * 이렇게 클라이언트 코드는 간단한 컴포넌트를 지원할 수 있습니다...
 */
const simple = new ConcreteComponent();
console.log("클라이언트: 간단한 컴포넌트를 가져왔습니다:");
clientCode(simple);
console.log("");

/**
 * ...장식된 컴포넌트도 마찬가지입니다.
 *
 * 데코레이터는 단순한 컴포넌트뿐만 아니라 다른 데코레이터도 래핑할 수 있다는 점에 주목하십시오.
 */
const decorator1 = new ConcreteDecoratorA(simple);
const decorator2 = new ConcreteDecoratorB(decorator1);
console.log("클라이언트: 이제 장식된 컴포넌트를 가져왔습니다:");
clientCode(decorator2);
