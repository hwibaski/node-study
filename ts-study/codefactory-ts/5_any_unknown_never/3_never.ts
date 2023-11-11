/**
 * Never Type
 */

// (1) 함수에서 무조건 에러를 던질 때
function throwError(): never {
    throw Error();
}

// (2) 무한 loop
function infiniteLoop(): never {
    while(true) {

    }
}

// (3) 존재할 수 없는 intersection
type StringAndNumber = string & number;
