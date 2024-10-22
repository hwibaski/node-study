/**
 * Component 인터페이스는 기본 방문자 인터페이스를 인자로 받는 `accept` 메서드를 선언합니다.
 */
interface Component {
  accept(visitor: Visitor): void;
}

/**
 * 각 Concrete Component는 `accept` 메서드를 구현해야 하며,
 * 이 메서드는 방문자의 해당 메서드를 호출해야 합니다.
 */
class ConcreteComponentA implements Component {
  /**
   * 현재 클래스 이름과 일치하는 `visitConcreteComponentA`를 호출합니다.
   * 이렇게 하면 방문자는 어떤 클래스의 구성 요소와 작업하는지 알 수 있습니다.
   */
  public accept(visitor: Visitor): void {
    visitor.visitConcreteComponentA(this);
  }

  /**
   * Concrete Components는 기본 클래스나 인터페이스에 존재하지 않는 특별한 메서드를 가질 수 있습니다.
   * 방문자는 구성 요소의 구체적인 클래스를 인식하고 있으므로 이러한 메서드를 사용할 수 있습니다.
   */
  public exclusiveMethodOfConcreteComponentA(): string {
    return "A";
  }
}

class ConcreteComponentB implements Component {
  /**
   * 여기서도 동일하게: visitConcreteComponentB => ConcreteComponentB
   */
  public accept(visitor: Visitor): void {
    visitor.visitConcreteComponentB(this);
  }

  public specialMethodOfConcreteComponentB(): string {
    return "B";
  }
}

/**
 * Visitor 인터페이스는 구성 요소 클래스에 해당하는 여러 개의 방문 메서드를 선언합니다.
 * 방문 메서드의 시그니처는 방문자가 처리하고 있는 구성 요소의 정확한 클래스를 식별할 수 있게 해줍니다.
 */
interface Visitor {
  visitConcreteComponentA(element: ConcreteComponentA): void;

  visitConcreteComponentB(element: ConcreteComponentB): void;
}

/**
 * Concrete Visitors는 모든 구체적인 구성 요소 클래스에서 작업할 수 있는 동일한 알고리즘의 여러 버전을 구현합니다.
 *
 * 복합체 구조와 같은 복잡한 객체 구조에서 Visitor 패턴의 가장 큰 이점을 경험할 수 있습니다.
 * 이 경우, 다양한 객체에 대해 방문자의 메서드를 실행하는 동안 알고리즘의 일부 중간 상태를 저장하는 것이 유용할 수 있습니다.
 */
class ConcreteVisitor1 implements Visitor {
  public visitConcreteComponentA(element: ConcreteComponentA): void {
    console.log(
      `${element.exclusiveMethodOfConcreteComponentA()} + ConcreteVisitor1`
    );
  }

  public visitConcreteComponentB(element: ConcreteComponentB): void {
    console.log(
      `${element.specialMethodOfConcreteComponentB()} + ConcreteVisitor1`
    );
  }
}

class ConcreteVisitor2 implements Visitor {
  public visitConcreteComponentA(element: ConcreteComponentA): void {
    console.log(
      `${element.exclusiveMethodOfConcreteComponentA()} + ConcreteVisitor2`
    );
  }

  public visitConcreteComponentB(element: ConcreteComponentB): void {
    console.log(
      `${element.specialMethodOfConcreteComponentB()} + ConcreteVisitor2`
    );
  }
}

/**
 * 클라이언트 코드는 구성 요소의 구체적인 클래스를 파악하지 않고도
 * 모든 요소 집합에 대해 방문자 작업을 실행할 수 있습니다.
 * accept 작업은 방문자 객체의 적절한 작업으로의 호출을 안내합니다.
 */
function clientCode(components: Component[], visitor: Visitor) {
  // ...
  for (const component of components) {
    component.accept(visitor);
  }
  // ...
}

const components = [new ConcreteComponentA(), new ConcreteComponentB()];

console.log(
  "클라이언트 코드는 기본 Visitor 인터페이스를 통해 모든 방문자와 함께 작동합니다:"
);
const visitor1 = new ConcreteVisitor1();
clientCode(components, visitor1);
console.log("");

console.log(
  "동일한 클라이언트 코드가 서로 다른 유형의 방문자와 작동할 수 있게 해줍니다:"
);
const visitor2 = new ConcreteVisitor2();
clientCode(components, visitor2);
