export {};

interface ChatMediator {
  sendMessage(message: string, user: User): void;
  addUser(user: User): void;
}

class ChatMediatorImpl implements ChatMediator {
  private users: User[] = [];

  constructor() {
    this.users = [];
  }

  public addUser(user: User): void {
    this.users.push(user);
  }

  public sendMessage(message: string, user: User): void {
    this.users.forEach((u) => {
      if (u !== user) {
        u.receiveMessage(message);
      }
    });
  }
}

abstract class User {
  protected mediator: ChatMediator;
  protected name: string;

  constructor(mediator: ChatMediator, name: string) {
    this.mediator = mediator;
    this.name = name;
  }

  abstract sendMessage(message: string): void;
  abstract receiveMessage(message: string): void;
}

class UserImpl extends User {
  constructor(name: string, mediator: ChatMediator) {
    super(mediator, name);
  }

  public sendMessage(message: string): void {
    this.mediator.sendMessage(message, this);
  }

  public receiveMessage(message: string): void {
    console.log(`${this.name}이 받은 메시지: ${message}`);
  }
}

const mediator = new ChatMediatorImpl();
const user1 = new UserImpl("User1", mediator);
const user2 = new UserImpl("User2", mediator);
const user3 = new UserImpl("User3", mediator);

mediator.addUser(user1);
mediator.addUser(user2);
mediator.addUser(user3);

user1.sendMessage("Hello, everyone!");
