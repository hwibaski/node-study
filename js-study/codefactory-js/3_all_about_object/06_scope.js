/**
 * Scope
 */
var numberOne = 20;

function levelOne(){
    console.log(numberOne);
}

// levelOne();

function levelOne(){
    var numberOne = 40;

    console.log(numberOne);
}

// levelOne();

console.log(numberOne);

function levelOne(){
    var numberOne = 40;

    function levelTwo(){
        var numberTwo = 99;

        console.log(`levelTwo numberTwo : ${numberTwo}`);
        console.log(`levelTwo numberOne : ${numberOne}`);
    }

    levelTwo();
    console.log(`levelOne numberOne : ${numberOne}`);
}

levelOne();
console.log(numberOne);
// console.log(numberTwo);

/**
 * JS -> Lexical Scope
 *
 * 선언된 위치가 상위 스코프를 정한다.
 *
 * Dynamic Scope
 *
 * 실행한 위치가 상위 스코프를 정한다.
 * 이런 언어가 있어? perl이 다이나믹 스코핑이라네
 */
var numberThree = 3;

function functionOne(){
    var numberThree = 100;

    functionTwo();
}

function functionTwo(){
    console.log(numberThree); // 3
}

functionOne();

var i = 999;

// for 안의 i가 global i를 덮어쓴다.
for(var i = 0; i < 10; i++){
    console.log(i);
}
console.log(`i in global scope : ${i}`) // 10

i = 999;
// block level scope
for(let i = 0; i < 10; i++){
    console.log(i);
}
console.log(`i in global scope : ${i}`);

/**
 * var 키워드는 함수 레벨 스코프만 만들어낸다.
 *
 * let, const 키워드는 함수 레벨 스코프와 블록 레벨 스코프를 만들어낸다.
 */
