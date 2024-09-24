/**
 * 클라이언트가 사용하는 인터페이스
 */
class NewTarget {
  public request(): string {
    return "이것은 기본 동작";
  }
}

/**
 * 기존 코드와 호환되지 않는 인터페이스를 가진 클래스
 */
class OldAdaptee {
  public specificRequest(): string {
    return "작동 본기 은것이";
  }
}

/**
 * 기존 코드와 ㅈ환되는 인터페이스를 가진 클래스
 */
class Adapter extends NewTarget {
  private adaptee: OldAdaptee;

  constructor(adaptee: OldAdaptee) {
    super();
    this.adaptee = adaptee;
  }

  public request(): string {
    const result = this.adaptee.specificRequest().split("").reverse().join("");
    return `Adapter: (번역됨) ${result}`;
  }
}

/**
 * The client code supports all classes that follow the Target interface.
 */
function clientCode(target: NewTarget) {
  console.log(target.request());
}

console.log("Client: I can work just fine with the Target objects:");
console.log("Client: 새로운 대상 객체로 작업할 수 있습니다.");
const target = new NewTarget();
clientCode(target);

console.log("");

console.log("Client: 기존 코드와 호환되지 않는 인터페이스를 가진 클래스");
const adaptee = new OldAdaptee();
console.log(`OldAdaptee: ${adaptee.specificRequest()}`);

console.log("");

console.log("Client: 어댑터를 통해 작업할 수 있습니다.");
const adapter = new Adapter(adaptee);
clientCode(adapter);
