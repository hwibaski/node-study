export { };

/**
 * typescript private 키워드로 구현
 */
class Singleton {
    private static instance: Singleton;

    private constructor() {}

    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }


}

function clientCode1() {
    const s1 = Singleton.getInstance();
    const s2 = Singleton.getInstance();

    if (s1 === s2) {
        console.log(
            'Singleton works, both variables contain the same instance.'
        );
    } else {
        console.log('Singleton failed, variables contain different instances.');
    }
}

clientCode1();

/**
 * javaScript # 키워드로 구현
 */
class Singleton2 {
    static #instance: Singleton2;

    private constructor() {}

    public static get instance(): Singleton2 {
        if (!Singleton2.#instance) {
            Singleton2.#instance = new Singleton2();
        }
        return Singleton2.#instance;
    }

    public someLogic() {
        console.log('someLogic');
    }
}

function clientCode2() {
    const s1 = Singleton2.instance;
    const s2 = Singleton2.instance;

    if (s1 === s2) {
        console.log(
            'Singleton works, both variables contain the same instance.'
        );
    } else {
        console.log('Singleton failed, variables contain different instances.');
    }
}

clientCode2();