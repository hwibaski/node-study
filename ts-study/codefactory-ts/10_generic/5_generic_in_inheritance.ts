/**
 * Generic in Inheritance
 */

class BaseCache<T> {
    data: T[] = [];
}

class StringCache extends BaseCache<string> {}

const stringCache = new StringCache();
stringCache.data; // string[];

// 자식의 T를 받아서 부모의 T에 넘겨준다.
class GenericChild<T, Message> extends BaseCache<T> {
    message?: Message;


    constructor(message?: Message) {
        super();
        this.message = message;
    }
}

const genericChild = new GenericChild<string, string>('error');
genericChild.data; // string[]
genericChild.message; // string | undefined

/**
 * 제네릭의 상속
 */

interface BaseGeneric {
    name: string;
}

// T 타입이 최소 BaseGeneric 타입 형태는 제공해줬으면 좋겠다!
class Idol<T extends BaseGeneric> {
    information: T;

    constructor(information: T) {
        this.information = information;
    }
}

const yuJin = new Idol({
    name:'안유진',
    age: 23
})

/**
 * keyof 와 제네릭 함께 사용하기
 */

const testObj = {
    a: 1,
    b: 2,
    c: 3,
}

// O 객체의 키 값들로 강제할거다 : K extends keyof O
function objectParser<O, K extends keyof O>(obj: O, key: K) {
    return obj[key];
}

const val = objectParser(testObj, 'a');

/**
 * Ternary
 * 1 === 2 ? true : false
 */

class Idol2 {
    type?: string;
}

class FemaleIdol extends Idol2 {
    type: 'Female Idol' = 'Female Idol';
}

class MaleIdol extends Idol2 {
    type: 'Male Idol' = 'Male Idol';
}

// T가 MaleIdol을 extends 하면 MaleIdol 아니면 FemaleIdol
type SpecificIdol<T extends Idol2> = T extends MaleIdol ? MaleIdol : FemaleIdol;

const idol2: SpecificIdol<FemaleIdol> = new FemaleIdol();
const idol3: SpecificIdol<MaleIdol> = new MaleIdol();


