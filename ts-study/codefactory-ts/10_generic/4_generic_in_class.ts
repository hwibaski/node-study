/**
 * Generic in Class
 */

class Pagination<Data, Message> {
    data: Data[] = [];
    message?: Message
    lastFetchedAt?: Date;
}

const pgDate = new Pagination<number, string>();
pgDate.data; // number[]
pgDate.message; // string | undefined
pgDate.lastFetchedAt // Date | undefined

class Pagination2<Data, Message> {
    data: Data[] = [];
    message?: Message
    lastFetchedAt?: Date;


    constructor(data: Data[], message?: Message, lastFetchedAt?: Date) {
        this.data = data;
        this.message = message;
        this.lastFetchedAt = lastFetchedAt;
    }
}

const pg2 = new Pagination2<number, string>([1, 2]);
pg2.data; // number[]
pg2.message; // unknown -> generic을 넣어주지도 않았고, 인수도 넣어주지 않아서
pg2.lastFetchedAt;

class DefaultGeneric<T = boolean> {
    data: T[] = [];
}

const defaultGeneric = new DefaultGeneric();
defaultGeneric.data; // boolean[]
