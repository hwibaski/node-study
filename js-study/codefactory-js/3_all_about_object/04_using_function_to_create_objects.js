/**
 * Using function to create objects
 */

// Don't do this
function Temp(name) {
    this.name = name;

    return {}; // 생성자 함수로 사용했지만 reference 타입을 리턴했기 때문에 빈 객체가 리턴된다. (primitive 타입 리턴하면 의도대로 생성자 함수로 사용 가능)
}

const temp = new Temp('test');
console.log(temp); // {}

function IdolModel(name, year){
    /**
     * 생성자 함수 목적으로 정의된 함수는 꼭 생성자로 사용하자.
     * 그러나 까먹을 수 있으니 new.target을 이용해서 놓칠 수 있는 부분을 챙겨주자
     * new 키워드 사용 : new.target -> [Function: IdolModel] 리턴
     * new 키워드 미사용 : undefined
     */
    if(!new.target){
        return new IdolModel(name, year);
    }

    /**
     * 해당 함수를 new 키워드 없이 호출하고 함수 내부에서 this 키워드를 사용하면
     * this는 global을 가리킨다.
     * this.name -> global.name
     */

    this.name = name;
    this.year = year;

    this.dance = function(){
        return `${this.name}이 춤을 춥니다.`;
    }
}

const yuJin = new IdolModel('안유진', 2003);
console.log(yuJin);
// console.log(yuJin.dance());
const yuJin2 = IdolModel('안유진', 2003);
console.log(yuJin2); // undefined -> why? IdolModel 생성자 함수에 new 키워드를 안 붙혀서
// console.log(global.name);


/**
 * 화살표 함수는 생성자 함수로 사용할 수 없다.
 */
const IdolModelArrow = (name, year)=>{
    this.name = name;
    this.year = year;
};

const yuJin3 = new IdolModelArrow('안유진', 2003); // 에러 발생!
