/**
 * Enum
 */

/**
 * API 요청을 한다.
 * 상태는 4 가지 상태
 *
 * DONE - 요청 완료 상태
 * ERROR - 에러가 생긴 상태
 * LOADING - 로딩 상태
 * INITIAL - 초기 상태
 */

function runWork() {
    let state = 'INITIAL';

    try {
        state = 'LOADING';

        // do work

        state = "DONE";
    } catch (e) {
        state = 'ERROR';
    } finally {
        return state;
    }
}

console.log(runWork() === 'DONE'); // 오타에 취약하다.

const doneState = 'DONE';
const loadingState = 'LOADING';
const errorState = 'ERROR';
const initialState = 'INITIAL';

function runWork2() {
    let state = initialState;

    try {
        state = loadingState;

        // do work

        state = doneState;
    } catch (e) {
        state = errorState;
    } finally {
        return state;
    }
}

console.log(runWork2() === doneState); // enum을 사용하지 않고 변수를 이용해서 오타에 대비하는 코드

/**
 *  DONE = 'DONE' 안해주면 0으로 출력됨
 */
enum State {
    DONE = 'DONE',
    LOADING= 'LOADING',
    ERROR = 'ERROR',
    INITIAL = 'INITIAL'
}

function runWork3() {
    let state = State.INITIAL;

    try {
        state = State.LOADING;

        // do work

        state = State.DONE;
    } catch (e) {
        state = State.ERROR;
    } finally {
        return state;
    }
}

console.log(runWork3() === State.DONE);
console.log(State.DONE); // 'DONE
