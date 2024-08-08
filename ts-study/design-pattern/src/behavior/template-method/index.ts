abstract class AbstractClass {
    public templateMethod(): void {
        this.baseOperation1();
        this.requiredOperation1();
        this.hook1();
        this.requiredOperation2();
        this.baseOperation2();
    }

    // 기본 구현을 가지고 있는 메서드들 
    // 하위 클래스에서 오버라이딩을 막기 위해 private로 선언
    private baseOperation1(): void {
        console.log("baseOperation1");
    }

    private baseOperation2(): void {
        console.log("baseOperation2");
    }


    // 하위 클래스에서 구현해야 하는 메서드들
    protected abstract requiredOperation1(): void;
    
    protected abstract requiredOperation2(): void;

    // 하위 클래스에서 재정의 할 수 있는 메서드들
    protected hook1(): void {}

}

class ConcreteClass1 extends AbstractClass {
    protected requiredOperation1(): void {
        console.log("ConcreteClass1: requiredOperation1");
    }

    protected requiredOperation2(): void {
        console.log("ConcreteClass1: requiredOperation2");
    }
}

class ConcreteClass2 extends AbstractClass {
    protected requiredOperation1(): void {
        console.log("ConcreteClass2: requiredOperation1");
    }

    protected requiredOperation2(): void {
        console.log("ConcreteClass2: requiredOperation2");
    }

     protected override hook1(): void {
        console.log("ConcreteClass2: hook1");
    }
}

function clientCode1(abstractClass: AbstractClass) {
    abstractClass.templateMethod();
}

clientCode1(new ConcreteClass1());
console.log("========================");
clientCode1(new ConcreteClass2());