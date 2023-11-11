/**
 * Generic in Type
 */
type GenericSimpleType<T> = T;

const genericString: GenericSimpleType<string> = 'hwibaski';
// Type Generic도 Default type이 없으면 생략 불가능
// const genericString2: GenericSimpleType = 'aaa'

interface DoneState<T> {
    data: T[];
}

interface LoadingState {
    requestedAt: Date;
}

interface ErrorState {
    error: string;
}

type State<T = string> = DoneState<T> | LoadingState | ErrorState;

let state: State<string> = {
    data: ['123', '456'],
};

let state2: State = {
    data: ['123', '456']
}

// default 제네릭이 string이기 때문에 generic 생략하고 number[] 할당 불가
// let state3: State = {
//     data: [1, 2]
// }
