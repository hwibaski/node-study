class Door {
  private state: State;

  constructor(state: State) {
    this.state = state;
  }

  /**
   * 상태를 변경해주기 위한 메서드
   * open(), close() 메서드에서 인자로 Door를 받아도 됨
   */
  public transitionTo(state: State): void {
    console.log(`Context: Transition to ${state.constructor.name}.`);
    this.state = state;
    this.state.setContext(this);
  }

  public open(): void {
    this.state.open();
  }

  public close(): void {
    this.state.close();
  }
}

abstract class State {
  protected context: Door;

  public setContext(context: Door) {
    this.context = context;
  }

  public abstract open(): void;
  public abstract close(): void;
}

class ClosedState extends State {
  public open(): void {
    console.log("Door is opened");
    this.context.transitionTo(new OpenState());
  }

  public close(): void {
    console.log("Door is already closed");
  }
}

class OpenState extends State {
  public open(): void {
    console.log("Door is already opened");
  }

  public close(): void {
    console.log("Door is closed");
    this.context.transitionTo(new ClosedState());
  }
}
