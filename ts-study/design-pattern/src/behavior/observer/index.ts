interface Subject {
  /**
   * 옵저버를 추가합니다.
   */
  attach(observer: Observer): void;

  /**
   * 옵저버를 제거합니다.
   */
  detach(observer: Observer): void;

  /**
   * 옵저버에게 상태 변경을 알립니다.
   */
  notify(): void;
}

/**
 * ConcreteSubject 클래스는 Subject 인터페이스를 구현합니다.
 */
class ConcreteSubject implements Subject {
  /**
   * 옵저버 목록
   */
  private observers: Observer[] = [];

  /**
   * 상태
   */
  public state: number = 0;

  /**
   * 옵저버를 추가합니다.
   */
  public attach(observer: Observer): void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      return console.log("Subject: Observer가 이미 존재합니다.");
    }

    this.observers.push(observer);
    console.log("Subject: 옵저버를 추가했습니다.");
  }

  /**
   * 옵저버를 제거합니다.
   */
  public detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      return console.log("Subject: 존재하지 않는 옵저버입니다.");
    }

    this.observers.splice(observerIndex, 1);
    console.log("Subject: 옵저버를 제거했습니다.");
  }

  /**
   * 옵저버에게 상태 변경을 알립니다.
   */
  public notify(): void {
    console.log("Subject: 옵저버에게 상태 변경을 알렸습니다.");
    for (const observer of this.observers) {
      observer.update(this);
    }
  }

  /**
   * 중요한 작업을 수행합니다.
   */
  public someBusinessLogic(): void {
    console.log("\nSubject: 중요한 작업을 수행합니다.");
    this.state = Math.floor(Math.random() * (10 + 1));

    console.log(`Subject: 상태가 변경되었습니다: ${this.state}`);
    this.notify();
  }
}

/**
 * Observer 인터페이스
 */
interface Observer {
  /**
   * Subject의 상태 변경을 받아들입니다.
   */
  update(subject: Subject): void;
}

class ConcreteObserverA implements Observer {
  public update(subject: Subject): void {
    if (subject instanceof ConcreteSubject && subject.state < 3) {
      console.log("ConcreteObserverA: 이벤트에 반응했습니다.");
    }
  }
}

class ConcreteObserverB implements Observer {
  public update(subject: Subject): void {
    if (
      subject instanceof ConcreteSubject &&
      (subject.state === 0 || subject.state >= 2)
    ) {
      console.log("ConcreteObserverB: 이벤트에 반응했습니다.");
    }
  }
}

const subject = new ConcreteSubject();
const observer1 = new ConcreteObserverA();
const observer2 = new ConcreteObserverB();
subject.attach(observer1);
subject.attach(observer2);

subject.someBusinessLogic();
subject.someBusinessLogic();
