/**
 * 생성자 함수
 *
 * 생성자 함수명은 일반적으로 대문자로 시작 - 파스칼 케이스
 * 생성자 함수로 만들어진 객체를 인스턴스 instance 라 부름
 * this.~로 생성될 인스턴스의 프로퍼티들 정의
 * 생성자 함수는 new 연산자와 함께 사용
 * 암묵적으로 this 반환
 * 생성자 함수에서는 메서드 정의 불가 - 객체 리터럴과 클래스에서는 가능
 */

// 생성자 함수
function YalcoChicken (name, no) {
    this.name = name;
    this.no = no;
    this.introduce = function () {
        return `안녕하세요, ${this.no}호 ${this.name}점입니다!`;
    }
}

// 인스턴스 생성
const chain1 = new YalcoChicken('판교', 3);
const chain2 = new YalcoChicken('강남', 17);
const chain3 = new YalcoChicken('제주', 24);

console.log(chain1, chain1.introduce());
console.log(chain2, chain2.introduce());
console.log(chain3, chain3.introduce());


// ⚠️ new를 붙이지 않으면 undefined 반환
// 호출시 new를 붙이는가 여부에 따라 호출 원리가 다름

function YalcoChicken (name, no) {
    this.name = name;
    this.no = no;
    this.introduce = function () {
        return `안녕하세요, ${this.no}호 ${this.name}점입니다!`;
    }
}

console.log(YalcoChicken('홍대', 30));

// 생성자 함수로 만들어진 객체

function YalcoChicken (name, no) {
    this.name = name;
    this.no = no;
    this.introduce = function () {
        return `안녕하세요, ${this.no}호 ${this.name}점입니다!`;
    }
}

const chain1 = new YalcoChicken('판교', 3);
console.log(chain1);

// 본사에서 새 업무를 추가
// 프로토타입: 본사에서 배포하는 메뉴얼이라고 이해
YalcoChicken.prototype.introEng = function () {
    return `Welcome to Yalco Chicken at ${this.name}!`;
};

console.log(chain1.introEng());

console.log(new YalcoChicken('강남', 17).introEng());
