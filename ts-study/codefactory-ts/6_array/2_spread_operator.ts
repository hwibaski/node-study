/**
 * Spread Operator
 */
const onlyString = ['1', '2', '3'];
const onlyNumbers = [1, 2, 3, 4];

// string[]
const arr1 = [
    ...onlyString,
]

// (string | number)[]
const arr2 = [
    ...onlyString,
    ...onlyNumbers
]
