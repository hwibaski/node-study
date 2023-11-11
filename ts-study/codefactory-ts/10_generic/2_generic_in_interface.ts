/**
 * Generic in Interface
 */
interface Cache<T> {
    data: T[];
    lastUpdate: Date;
}

const cache1: Cache<string> = {
    data: ['data1', 'data2'],
    lastUpdate: new Date(),
}

// 생략 불가능
// const cache2: Cache = {
//     data: [123, 456],
//     lastUpdate: new Date(),
// }

/**
 * Default Generic
 */
interface DefaultGeneric<T = number> {
    data: T[]
}

const cache3: DefaultGeneric = {
    data: [1, 2]
}
