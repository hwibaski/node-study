interface Button {
  paint(): void;
}

interface Checkbox {
  paint(): void;
}

class WindownsButton implements Button {
  public paint(): void {
    console.log("Windows 버튼을 그립니다.");
  }
}

class WindownsCheckbox implements Checkbox {
  public paint(): void {
    console.log("Windows 체크박스를 그립니다.");
  }
}

class MacOSButton implements Button {
  public paint(): void {
    console.log("MacOS 버튼을 그립니다.");
  }
}

class MacOSCheckbox implements Checkbox {
  public paint(): void {
    console.log("MacOS 체크박스를 그립니다.");
  }
}

interface GUIFactory {
  createButton(): Button;
  createCheckbox(): Checkbox;
}

class WindownsFactory implements GUIFactory {
  public createButton(): Button {
    return new WindownsButton();
  }

  public createCheckbox(): Checkbox {
    return new WindownsCheckbox();
  }
}

class MacOSFactory implements GUIFactory {
  public createButton(): Button {
    return new MacOSButton();
  }

  public createCheckbox(): Checkbox {
    return new MacOSCheckbox();
  }
}

class Application {
  private button: Button;
  private checkbox: Checkbox;

  constructor(factory: GUIFactory) {
    this.button = factory.createButton();
    this.checkbox = factory.createCheckbox();
  }

  public paint(): void {
    this.button.paint();
    this.checkbox.paint();
  }
}

function clientCode(factory: GUIFactory) {
  const app = new Application(factory);
  app.paint();
}

clientCode(new WindownsFactory());

export {};
