/**
 * Multi Dimension Array
 */

const numb2Darr: number[][] = [
    [1, 2, 3],
    [4, 5, 6]
]

const str2DArr = [
    ['1', '2', '3'],
    ['4', '5', '6']
]

const strAndNumberArr: (number| string)[][] = [
    [1, '2', 3],
    ['4', 5, '6'],
]

let strArrOrNumbArr: string[][] | number[][] = [
    [1, 2, 3],
    [4, 5, 6]
]

strArrOrNumbArr = [
    ['1', '2', '3']
]

for (let arr of numb2Darr) {
    for (let item of arr) {

    }
}
