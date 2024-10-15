class Flyweight {
  private sharedState: any;

  constructor(sharedState: any) {
    this.sharedState = sharedState;
  }

  public operation(uniqueState: any): void {
    const s = JSON.stringify(this.sharedState);
    const u = JSON.stringify(uniqueState);
    console.log(`Flyweight: Displaying shared (${s}) and unique (${u}) state.`);
  }
}

class FlyweightFactory {
  private flyweights: { [key: string]: Flyweight } = {};

  constructor(initialFlyweights: string[][]) {
    for (const state of initialFlyweights) {
      this.flyweights[this.getKey(state)] = new Flyweight(state);
    }
    console.log(this.flyweights);
  }

  /**
   * 플라이웨이트의 상태를 키를 생성합니다.
   */
  private getKey(state: string[]): string {
    return state.join("_");
  }

  /**
   * 플라이웨이트를 반환합니다.
   * 주어진 sharedState가 존재하면 기존 플라이웨이트를 반환하고, 존재하지 않으면 새로운 플라이웨이트를 생성하여 반환합니다.
   */
  public getFlyweight(sharedState: string[]): Flyweight {
    const key = this.getKey(sharedState);
    if (!(key in this.flyweights)) {
      console.log("FlyweightFactory: 존재하지 않는 플라이웨이트를 생성합니다.");
      this.flyweights[key] = new Flyweight(sharedState);
    } else {
      console.log("FlyweightFactory: 존재하는 플라이웨이트를 반환합니다.");
    }
    return this.flyweights[key];
  }

  /**
   * 플라이웨이트를 나열합니다.
   */
  public listFlyweights(): void {
    const count = Object.keys(this.flyweights).length;
    console.log(
      `\nFlyweightFactory: 총 ${count} 개의 플라이웨이트 인스턴스가 있습니다.`
    );
    for (const key in this.flyweights) {
      console.log(key);
    }
  }
}

// 플라이웨이트 팩토리를 생성합니다.
const factory = new FlyweightFactory([
  ["Chevrolet", "Camaro2018", "pink"],
  ["Mercedes Benz", "C300", "black"],
  ["Mercedes Benz", "C500", "red"],
  ["BMW", "M5", "red"],
  ["BMW", "X6", "white"],
]);

// 플라이웨이트 팩토리를 나열합니다.
factory.listFlyweights();

// flyweight 팩토리에 차를 추가하는 함수
function addCarToPoliceDatabase(
  factory: FlyweightFactory,
  plates: string,
  owner: string,
  brand: string,
  model: string,
  color: string,
  optional: string[]
) {
  const flyweight = factory.getFlyweight([brand, model, color]);
  flyweight.operation([plates, owner]);
}
addCarToPoliceDatabase(factory, "CL234IR", "James Doe", "BMW", "M5", "red", []);
addCarToPoliceDatabase(factory, "CL234IR", "James Doe", "BMW", "X1", "red", []);

factory.listFlyweights();
