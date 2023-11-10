/**
 * Intersection
 *
 * And 타입
 */

interface Human {
    name: string;
    age: number;
}

interface Contacts {
    phone: string;
    address: string;
}

type HumanAndContacts = Human & Contacts;

let humanAndContact: HumanAndContacts = {
    name: 'hwibaski',
    age: 33,
    phone: "1234",
    address: "abcd"
}

/**
 * 존재할 수 없는 타입을 intersection 한다면?
 * -> never
 */
type NumberAndString = number & string; // never
