/**
 * Tuple
 *
 * JS에서 원래 존재하는 개념은 아니지만 TS의 도움으로 사용 가능
 */

let iveTopMembers: string[] = ['안유진', '장원영', '레이'];

let numberAndStringTuple: [number, string] = [
    23,
    '코드팩토리'
];

// [number, string] 순서를 강제한다.
// number, string의 순서로 2개만 넣을 수 있다.
// let numberAndStringTuple2: [number, string] = [
//     'hwibaski',
//     23
// ]

// 그러나 tuple에 push 할 수 있기 때문에 tuple 사용이 무의미해진다.
numberAndStringTuple.push('아이유');
console.log(numberAndStringTuple);

// 그래서 readonly 키워드 사용!!

let unmodifiableTuple: readonly [number, string] = [23, 'hwibaski'];
// unmodifiableTuple.push()

/**
 * Tuple 유추하기
 */
let actresses = ['김고은', '박소담', '전여빈'];
let actressesTuple = ['김고은', '박소담', '전여빈'] as const;
const actressesTupleConst = ['김고은', '박소담', '전여빈'] as const;

let stringArray: string[] = [
    ...actressesTuple,
    ...actressesTupleConst,
    // ...[1, 2, 3]
]

/**
 * Named Tuple
 */

// 튜플의 인덱스에 이름을 지어줄 수 있다. 기능적으로 달라지는건 없고 IDE에서 추가정보 확인 가능
const namedTuple: [name: string, age: number] = [
    'hwibaski',
    32,
];

/**
 * Assigning Tuple To Tuple
 *
 * Tuple은 같은 타입끼리만 할당이 가능하다.
 */

const tuple1: [string, string] = ['아이유', '유예나'];
const tuple2: [number, number] = [1, 2];

// 할당 불가
// let tuple3: [boolean, boolean] = tuple1;
// let tuple4: [number, number, number] = tuple2

// 할당 가능
let tuple5: [number, number] = tuple2;

/**
 * Tuple 과 Array의 관계
 *
 */

let ive: [string, string] = ['장원영', '안유진'];

// ive가 더 구체적인 타입이므로 string[]에 할당가능
let stringArr: string[] = ive;

// 76번 코드에서 stringArr에 ive를 할당했음에도 불구하고 다시 tuple 타입으로 할당이 불가하다
// TS는 stringArr이 string[] 이라는 것만 인식한다. 값을 할당해서 [string, string]이라는 것 까지는 알지 못함
// let ive2: [string, string] = stringArr

/**
 * Multi Dimensional Tuple
 */

const tuple2D : [string, number][] = [
    ['a', 32],
    ['b', 31],
    ['c', 30],
];
