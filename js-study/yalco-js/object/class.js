// 클래스와 생성자 함수의 차이
// 1. 호이스팅 되지 않음 (정확히는 되지만..)
// 2. 클래스는 new 없이 사용하면 오류 (생성자 함수는 오류 없이 undefined 반환)


// 클래스의 메서드
// 클래스의 메서드는 프로토타입으로 들어감
// 생성자 함수로 만든 메서드는 인스턴스 자체에 들어감
class Dog {
    bark () {
        return '멍멍';
    }
}
const badugi = new Dog();
console.log(badugi, badugi.bark());
// Dog {} 멍멍

function Dog2 () {
    this.bark = function () {
        return '멍멍';
    }
}
const badugi2 = new Dog2();
console.log(badugi2, badugi2.bark());
// Dog2 { bark: [Function (anonymous)] } 멍멍

// static field & method
// 인스턴스의 수와 관계없이 메모리 한 곳만 차지
// 인스턴스 없이 클래스 차원에서 호출
// ⚠️ 정적 메서드에서는 정적 필드만 사용 가능

class YalcoChicken {

    // 정적 변수와 메서드
    static brand = '얄코치킨';
    static contact () {
        return `${this.brand}입니다. 무엇을 도와드릴까요?`;
    }

    constructor (name, no) {
        this.name = name;
        this.no = no;
    }
    introduce () {
        return `안녕하세요, ${this.no}호 ${this.name}점입니다!`;
    }
}

console.log(YalcoChicken);
console.log(YalcoChicken.contact());

// 클래스는 함수
// typeof시 function으로 구분
// 일급 객체, 다른 곳에 할당 가능

class Dog3 {
    bark () {
        return '멍멍';
    }
}

console.log(typeof Dog3); // function

const 개 = Dog2; // 할당될 수 있는 일급 객체
const 바둑이 = new 개();

console.log(바둑이); // 💡 콘솔에 나타난 타입 확인
